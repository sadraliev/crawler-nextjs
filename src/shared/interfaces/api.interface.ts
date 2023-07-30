export interface ScrapedData {
  sectionType: string;
  sectionName: string;
  sectionURL: string;
  details: Detail[];
}

export interface Detail {
  link: string;
  code: string;
  withStar: boolean;
  fullText: string;
  children: Detail[];
}
