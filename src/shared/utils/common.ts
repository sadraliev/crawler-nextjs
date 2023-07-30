import { configuration } from "@/shared/config/configuration";
import { PathBuilder } from "./query.builder";
import { Detail, ScrapedData } from "../interfaces/api.interface";
import { STORAGE_KEY } from "../consts/main";

export const pathBuilder = new PathBuilder(configuration.getUrl());

export const fetcher = (url: string, init?: RequestInit) =>
  fetch(url, init).then(res => res.json());

const searchInDetails = (details: Detail[], query: string): Detail[] => {
  let results: Detail[] = [];

  for (const detail of details) {
    if (detail.fullText.includes(query)) {
      results.push(detail);
    }

    if (detail.children.length > 0) {
      results = [...results, ...searchInDetails(detail.children, query)];
    }
  }

  return results;
};

export const searchInScrapedData = (
  data: ScrapedData,
  query: string
): Detail[] => {
  return searchInDetails(data.details, query);
};

type DataItem = {
  id?: string;
  code: string;
  children: DataItem[];
};

export function getTreeFromLocalStorage(): DataItem[] {
  const rawData = localStorage.getItem(STORAGE_KEY);
  return rawData ? JSON.parse(rawData) : [];
}

export function saveTreeToLocalStorage(tree: DataItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tree));
}

export function getCode(text: string): string {
  const [codeDescription] = text.split(" ");
  const [code] = codeDescription.split("-");
  return code;
}

export function updateTreeWithItem(
  tree: DataItem[],
  newItem: string
): DataItem[] {
  const code = getCode(newItem);

  function findOrCreateNode(
    targetTree: DataItem[],
    fullCode: string
  ): DataItem {
    let existingNode = targetTree.find(item => item.code === fullCode);

    if (!existingNode) {
      existingNode = {
        code: fullCode,
        children: [],
      };
      targetTree.push(existingNode);
    }

    return existingNode;
  }

  const codes = code.split(".");
  let currentTree = tree;
  let currentFullCode = "";
  let node: DataItem | null = null;

  for (const segment of codes) {
    if (currentFullCode) {
      currentFullCode += "." + segment;
    } else {
      currentFullCode = segment;
    }

    node = findOrCreateNode(currentTree, currentFullCode);
    if (!node.children) {
      node.children = [];
    }
    console.log("node", node);
    currentTree = node.children;
  }
  if (node) {
    node.id = code;
  }

  return tree;
}

export function removeItemFromTree(
  tree: DataItem[],
  codeToRemove: string
): DataItem[] {
  const code = getCode(codeToRemove);

  function recursiveRemove(items: DataItem[], targetCode: string): DataItem[] {
    for (let i = 0; i < items.length; i++) {
      if (items[i].code === targetCode) {
        items.splice(i, 1);
        return items;
      } else if (items[i].children) {
        items[i].children = recursiveRemove(items[i].children, targetCode);
        if (!items[i].id && items[i].children.length === 0) {
          items.splice(i, 1);
        }
      }
    }
    return items;
  }

  return recursiveRemove(tree, code);
}

export function findNodeByCode(
  code: string,
  items: DataItem[]
): DataItem | null {
  for (const item of items) {
    if (item?.id === code) return item;
    if (item.children) {
      const found = findNodeByCode(code, item.children);
      if (found) return found;
    }
  }
  return null;
}

export function findChildrenByCode(
  code: string,
  items: DataItem[]
): DataItem | null {
  for (const item of items) {
    if (item.code === code) return item;
    if (item.children) {
      const found = findChildrenByCode(code, item.children);
      if (found) return found;
    }
  }
  return null;
}

export function doesCodeExist(code: string): boolean {
  const tree = getTreeFromLocalStorage();
  if (!tree.length) return false;

  const node = findNodeByCode(code, tree);
  return Boolean(node);
}

export function hasChildren(code: string): boolean {
  const tree = getTreeFromLocalStorage();
  if (!tree.length) return false;

  const node = findChildrenByCode(code, tree);

  return node
    ? Array.isArray(node?.children) && node.children.length > 0
    : false;
}
