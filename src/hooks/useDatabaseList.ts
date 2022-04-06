import { Database } from "src/types";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useStorage } from "./useStorage";

const databases = atom<Database[]>([]);

export const useDatabaseList = () => {
  const [databaseList, setDatabaseList] = useAtom(databases);
  const { items } = useStorage();
  console.log("items", items);

  useEffect(() => {
    const databaseIds = Object.keys(items);
    const databaseList = databaseIds.map((id) => JSON.parse(items[id]));
    setDatabaseList(databaseList);
  }, [items]);

  return { databaseList, setDatabaseList };
};
