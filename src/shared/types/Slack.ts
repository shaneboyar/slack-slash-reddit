export interface SlackMessageData {
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
