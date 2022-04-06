import { LocalStorage } from "@raycast/api";
import { Database } from "src/types";

/* Databaseに関する情報をJSONにしてLocalStorageに保存 */
export const upsertDatabase = async (database: Database) => {
  const id = database.id;
  const json = JSON.stringify(database);
  LocalStorage.setItem(id, json);
};
