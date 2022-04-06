export type Preferences = {
  NOTION_INTEGRATION_TOKEN: string;
  NOTION_DATABASE_ID: string;
};

export type PostContents = {
  databaseId: string;
  title: string;
  content: string;
  category: string;
};

export type Database = {
  id: string;
  title: string;
  icon?: string;
  categories: string[];
  done: boolean;
};
