export type Preferences = {
  NOTION_INTEGRATION_TOKEN: string;
};
export type PostContents = {
  databaseId: string;
  title: string;
  content: string;
  category: string;
  date?: string;
};
export type Database = {
  id: string;
  title: string;
  icon?: string;
  categories: string[];
  done: boolean;
  updatedAt?: string;
};
export type UpsertedDatabase = Database & {
  updatedAt: string;
};
