import { Form, ActionPanel, Action, showToast, Toast, useNavigation, closeMainWindow } from "@raycast/api";
import { useState } from "react";
import { postContents } from "./utils/notion";
import { Database, PostContents } from "./types";
import { useDatabaseList } from "./hooks/useDatabaseList";

const initialDatabase: Database = {
  id: "",
  title: "",
  categories: [],
  done: false,
};

export default function Command() {
  const { pop } = useNavigation();
  const { databaseList } = useDatabaseList();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedDatabase, setSelectedDatabase] = useState<Database>(initialDatabase);

  /* 送信 */
  const handleSubmit = async (values: PostContents) => {
    /* Validation */
    if (!values.title) return showToast({ title: "Title is required", style: Toast.Style.Failure });
    if (!values.databaseId) return showToast({ title: "Database is required", style: Toast.Style.Failure });

    setIsLoading(true);
    try {
      await postContents(values);
      await showToast({ title: "Success!!" });
      pop();
      await closeMainWindow();
    } catch (err) {
      showToast({ title: "Error", message: err as string, style: Toast.Style.Failure });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDatabase = (id: string) => {
    const selectDatabase = databaseList.find((database) => database.id === id);
    if (!selectDatabase) return;
    setSelectedDatabase(selectDatabase);
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
      isLoading={isLoading}
    >
      <Form.TextField id="title" title="title" placeholder="short text" />
      <Form.TextArea id="content" title="page contents" placeholder="about content" />

      {/* <Form.DatePicker id="datepicker" title="Date picker" /> */}
      {/* {selectedDatabase.done && <Form.Checkbox id="done" title="Check" label="Checkbox Label" storeValue />} */}

      {selectedDatabase.categories.length !== 0 && (
        <Form.Dropdown id="category" title="category" defaultValue="">
          {selectedDatabase.categories.map((categoryName, index) => (
            <Form.Dropdown.Item key={`${categoryName} ${index}`} value={categoryName} title={categoryName} />
          ))}
        </Form.Dropdown>
      )}

      {/* <Form.TagPicker id="tokeneditor" title="Tag picker">
        <Form.TagPicker.Item value="tagpicker-item1" title="TagPicker Item1" />
        <Form.TagPicker.Item value="tagpicker-item2" title="TagPicker Item2" />
        <Form.TagPicker.Item value="tagpicker-item3" title="TagPicker Item3" />
      </Form.TagPicker> */}

      <Form.Separator />

      <Form.Dropdown
        id="databaseId"
        title="Database Name"
        storeValue
        value={selectedDatabase.id}
        onChange={(value) => handleSelectDatabase(value)}
      >
        {databaseList.map((database) => (
          <Form.Dropdown.Item key={database.id} value={database.id} title={database.title} />
        ))}
      </Form.Dropdown>
    </Form>
  );
}
