import { UpsertedDatabase } from "src/types";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useStorage } from "./useStorage";

const databases = atom<UpsertedDatabase[]>([]);

export const useDatabaseList = () => {
  const [databaseList, setDatabaseList] = useAtom(databases);
  const { items } = useStorage();

  useEffect(() => {
    const databaseIds = Object.keys(items);
    const databaseList: UpsertedDatabase[] = databaseIds.map((id) => JSON.parse(items[id]));
    setDatabaseList(databaseList);
  }, [items]);

  return { databaseList, setDatabaseList };
};
