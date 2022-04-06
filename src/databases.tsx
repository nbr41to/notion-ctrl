import { ActionPanel, Action, useNavigation, List, LocalStorage, confirmAlert, Icon } from "@raycast/api";
import { useDatabaseList } from "./hooks/useDatabaseList";
import { useStorage } from "./hooks/useStorage";
import { getDatabaseInfo } from "./utils/notion";
import { upsertDatabase } from "./utils/storage";
import { DatabaseIdForm } from "./views/DatabaseIdForm";

export default function Command() {
  const { push } = useNavigation();
  const { removeItem, setItems, items } = useStorage();
  const { databaseList, setDatabaseList } = useDatabaseList();

  const handleUpsert = async (databaseId: string) => {
    await LocalStorage.clear();
    try {
      const response = await getDatabaseInfo(databaseId);
      if (!response) return;
      await upsertDatabase(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (databaseId: string) => {
    if (
      await confirmAlert({
        title: "Are you sure?",
        message: "データベースを削除しますか？",
        icon: Icon.ExclamationMark,
      })
    ) {
      await removeItem(databaseId);
      // delete items[databaseId];
      // setItems(items);
      setDatabaseList(databaseList.filter((database) => database.id !== databaseId));
    }
  };

  return (
    <List>
      <List.Item
        title="+ Add new database"
        actions={
          <ActionPanel>
            <Action title="Add new database" onAction={() => push(<DatabaseIdForm />)} />
          </ActionPanel>
        }
      />
      <List.Item
        title="test action"
        subtitle=""
        actions={
          <ActionPanel>
            <Action title="" onAction={() => handleUpsert("aaaa")} />
          </ActionPanel>
        }
      />
      {databaseList.map((database) => (
        <List.Item
          key={database.id}
          title={database.title}
          subtitle="subtitle"
          actions={
            <ActionPanel>
              <ActionPanel.Section title="Action Menu">
                <Action title="info" onAction={() => console.log("info!!")} />
                <Action title="upsert" onAction={() => handleUpsert(database.id)} />
                <Action
                  title="delete2"
                  shortcut={{ modifiers: ["cmd"], key: "delete" }}
                  onAction={() => handleDelete(database.id)}
                />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
