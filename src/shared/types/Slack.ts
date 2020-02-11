import { SubredditData } from "./Reddit";

export enum ResponseValue {
  DELETE = "deleteMessage",
  NEXT = "nextOption"
}

export type SlackMessageData = Pick<
  SubredditData,
  "title" | "display_name_prefixed" | "icon_img" | "public_description"
>;

export type ActionsPayload = {
  type: string;
  team: { id: string; domain: string };
  user: {
    id: string;
    username: string;
    name: string;
    team_id: string;
  };
  api_app_id: string;
  token: string;
  container: {
    type: string;
    message_ts: string;
    channel_id: string;
    is_ephemeral: true;
  };
  trigger_id: string;
  channel: { id: string; name: string };
  response_url: string;
  actions: [
    {
      action_id: string;
      block_id: string;
      text: [Object];
      value: string;
      type: string;
      action_ts: string;
    }
  ];
};

export type SlackMessage = {
  response_type?: "ephemeral" | "in_channel";
  text: string;
  blocks?: SlackBlock[];
};

export type SlackBlock = SectionBlock | ActionBlock | ImageBlock;

export type SectionBlock = {
  type: "section";
  text: TextConfig;
  accessory?: ImageBlock;
};

export type TextConfig = {
  type: "mrkdwn" | "plain_text";
  text: string;
  emoji?: boolean;
};

export type ActionBlock = {
  type: "actions";
  elements: ActionElement[];
};

export type ImageBlock = {
  type: "image";
  image_url: string;
  alt_text: string;
};

export type ActionElement = ButtonElement;

export type ButtonElement = {
  type: "button";
  text: TextConfig;
  value?: any;
  style?: "primary" | "danger";
};

// export declare class SlackClient {
//   protected searchResults?: RedditSearchResult[];
//   protected currentResultIndex: 0;

//   generateSlackErrorMessage(): SlackMessage;
//   generateSlackMessage({
//     title,
//     display_name_prefixed,
//     icon_img,
//     public_description
//   }: SlackMessageData): SlackMessage;
//   deleteMessage(responseUrl: string): void;
//   publishMessage(channelId: string, messagePayload: SlackMessage): void;
// }
