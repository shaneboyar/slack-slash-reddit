import fetch from "node-fetch";

export const DELETE_VALUE = "deleteMessage";
interface SlackMessageData {
  title: string;
  display_name_prefixed: string;
  icon_img: string;
  public_description: string;
}

export type SlackMessage = {
  response_type?: "ephemeral" | "in_channel";
  text: string;
  blocks?: SlackBlock[];
};

type SlackBlock = SectionBlock | ActionBlock | ImageBlock;

type SectionBlock = {
  type: "section";
  text: TextConfig;
  accessory?: ImageBlock;
};

type TextConfig = {
  type: "mrkdwn" | "plain_text";
  text: string;
  emoji?: boolean;
};

type ActionBlock = {
  type: "actions";
  elements: ActionElement[];
};

type ImageBlock = {
  type: "image";
  image_url: string;
  alt_text: string;
};

type ActionElement = ButtonElement;

type ButtonElement = {
  type: "button";
  text: TextConfig;
  value?: any;
  style?: "primary" | "danger";
};

export const generateSlackErrorMessage = () => {
  const message: SlackMessage = {
    response_type: "ephemeral",
    text: "We couldn't find a subreddit like that.",
    blocks: [
      {
        type: "section",
        text: {
          type: "plain_text",
          text: "We couldn't find a subreddit like that.",
          emoji: false
        }
      },
      {
        type: "image",
        image_url: "https://media.giphy.com/media/BmDVHqd6DXkeQ/giphy.gif",
        alt_text: "Sucks to be you nerd."
      }
    ]
  };

  return message;
};

export const generateSlackMessage = ({
  title,
  display_name_prefixed,
  icon_img,
  public_description
}: SlackMessageData) => {
  const url = `https://www.reddit.com/${display_name_prefixed}`;
  const messageBlock: SectionBlock = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `<${url}|${title}> \n ${public_description}`
    },
    accessory: icon_img
      ? {
          type: "image",
          image_url: icon_img,
          alt_text: `${title} icon`
        }
      : undefined
  };

  const confirmButton: ButtonElement = {
    type: "button",
    text: {
      type: "plain_text",
      text: "Send",
      emoji: false
    },
    value: JSON.stringify(messageBlock)
  };

  const cancelButton: ButtonElement = {
    type: "button",
    text: {
      type: "plain_text",
      text: "Cancel",
      emoji: false
    },
    style: "danger",
    value: DELETE_VALUE
  };

  const message: SlackMessage = {
    response_type: "ephemeral",
    text: title,
    blocks: [
      messageBlock,
      {
        type: "actions",
        elements: [confirmButton, cancelButton]
      }
    ]
  };

  return message;
};

export const deleteMessage = (responseUrl: string) => {
  fetch(responseUrl, {
    method: "POST",
    body: JSON.stringify({
      delete_original: true
    })
  });
};

export const publishMessage = (
  channelId: string,
  messagePayload: SlackMessage
) => {
  fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.OAUTH_ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      channel: channelId,
      ...messagePayload
    })
  })
    .then(resp => resp.json())
    .then(data => console.log("data", data));
};
