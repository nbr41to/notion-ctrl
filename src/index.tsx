import { Form, ActionPanel, Action, showToast, showHUD, Toast, useNavigation, closeMainWindow } from "@raycast/api";
import { useState } from "react";
import { postContents } from "./notion";
import { PostContents } from "./types";

export default function Command() {
  const { pop } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: PostContents) => {
    if (!values.title) return showToast({ title: "Title is required", style: Toast.Style.Failure });
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
      <Form.TextArea id="children" title="page contents" placeholder="about content" />
      {/* <Form.Separator /> */}
      {/* <Form.DatePicker id="datepicker" title="Date picker" /> */}
      {/* <Form.Checkbox id="checkbox" title="Checkbox" label="Checkbox Label" storeValue /> */}
      <Form.Dropdown id="category" title="Dropdown" defaultValue="tech">
        <Form.Dropdown.Item value="tech" title="tech" />
        <Form.Dropdown.Item value="other" title="other" />
      </Form.Dropdown>
      {/* <Form.TagPicker id="tokeneditor" title="Tag picker">
        <Form.TagPicker.Item value="tagpicker-item1" title="TagPicker Item1" />
        <Form.TagPicker.Item value="tagpicker-item2" title="TagPicker Item2" />
        <Form.TagPicker.Item value="tagpicker-item3" title="TagPicker Item3" />
      </Form.TagPicker> */}
    </Form>
  );
}
