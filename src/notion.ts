import { Client } from "@notionhq/client";
import { getPreferenceValues } from "@raycast/api";
import { PostContents, Preferences } from "./types";

const { NOTION_INTEGRATION_TOKEN, NOTION_DATABASE_ID } = getPreferenceValues<Preferences>();

// Initializing a client
const notion = new Client({
  auth: NOTION_INTEGRATION_TOKEN,
});

export const getUser = async () => {
  return await notion.users.list({});
};

export const postContents = async (values: PostContents) => {
  return await notion.pages.create({
    parent: {
      database_id: NOTION_DATABASE_ID,
    },
    properties: {
      title: {
        title: [
          {
            text: {
              content: values.title,
            },
          },
        ],
      },
      category: {
        select: {
          name: values.category,
        },
      },
    },

    children: values.children.split("\n").map((child) => {
      return {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: child,
              },
            },
          ],
        },
      };
    }),
  });
};
