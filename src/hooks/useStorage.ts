import { LocalStorage } from "@raycast/api";
import { useEffect, useState } from "react";

export const useStorage = () => {
  const [items, setItems] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    void (async () => {
      const items = await LocalStorage.allItems<{ [key: string]: string }>();
      setItems(items);
    })();
  }, []);

  const setItem = async (key: string, value: string) => {
    await LocalStorage.setItem(key, value);
  };

  const removeItem = async (key: string) => {
    await LocalStorage.removeItem(key);
  };

  return { items, setItems, setItem, removeItem };
};
