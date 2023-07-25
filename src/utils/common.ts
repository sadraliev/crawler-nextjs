import { configuration } from "@/config/configuration";
import { PathBuilder } from "./query.builder";

export const pathBuilder = new PathBuilder(configuration.getUrl());

export const MAIN_PATH = pathBuilder.addSegment("api").build();

export const fetcher = (url: string, init?: RequestInit) =>
  fetch(url, init).then(res => res.json());
