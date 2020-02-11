import fetch from "node-fetch";
import {
  SlackMessage,
  SectionBlock,
  ButtonElement,
  ResponseValue,
  RedditSearchResult
} from "$types";

class Client {
  private _searchResults?: RedditSearchResult[];
  private currentResultIndex: number = 0;

  set searchResults(results: RedditSearchResult[]) {
    this._searchResults = results;
  }

  cancelButton: ButtonElement = {
    type: "button",
    text: {
      type: "plain_text",
      text: "Cancel",
      emoji: false
    },
    style: "danger",
    value: ResponseValue.DELETE
  };

  nextButton: ButtonElement = {
    type: "button",
    text: {
      type: "plain_text",
      text: "Next ➡️",
      emoji: true
    },
    style: "primary",
    value: ResponseValue.NEXT
  };

  generateConfirmButton = (messageBlock: SectionBlock) => {
    const confirmButton: ButtonElement = {
      type: "button",
      text: {
        type: "plain_text",
        text: "Send",
        emoji: false
      },
      value: JSON.stringify(messageBlock)
    };

    return confirmButton;
  };

  generateErrorMessage = () => {
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

  public generateMessage = () => {
    if (!this._searchResults) {
      throw new Error("Something went wrong trying to generate Slack Message");
    }
    const {
      display_name_prefixed,
      title,
      public_description,
      icon_img
    } = this._searchResults[this.currentResultIndex].data;
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

    const message: SlackMessage = {
      response_type: "ephemeral",
      text: title,
      blocks: [
        messageBlock,
        {
          type: "actions",
          elements: [
            this.generateConfirmButton(messageBlock),
            this.cancelButton,
            this.nextButton
          ]
        }
      ]
    };

    return message;
  };

  deleteMessage = (responseUrl: string) => {
    fetch(responseUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        delete_original: true
      })
    });
  };

  publishMessage = (channelId: string, messagePayload: SlackMessage) => {
    fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${process.env.OAUTH_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        channel: channelId,
        ...messagePayload
      })
    });
  };

  replaceWithNextOption = (responseUrl: string) => {
    if (
      this._searchResults &&
      this.currentResultIndex <= this._searchResults.length
    ) {
      this.currentResultIndex += 1;
    } else {
      this.currentResultIndex = 0;
    }

    fetch(responseUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        replace_original: true,
        ...this.generateMessage()
      })
    });
  };
}

export default Client;
