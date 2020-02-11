import base64 from "base-64";
import FormData from "form-data";
import fetch from "node-fetch";
import { RedditSearchResponse } from "$types";

class Client {
  private accessToken?: string;
  private USER_AGENT: string = "Slack Slash Reddit";

  constructor() {
    this.build();
  }

  private build = async () => {
    try {
      if (!process.env.REDDIT_SECRET || !process.env.REDDIT_APP_ID) {
        throw new Error(
          "You need to add a REDDIT_SECRET and REDDIT_APP_ID to your env"
        );
      }
      let auth = base64.encode(
        `${process.env.REDDIT_APP_ID}:${process.env.REDDIT_SECRET}`
      );
      let body = new FormData() as any;
      body.append("grant_type", "client_credentials");

      const res = await fetch("https://www.reddit.com/api/v1/access_token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "User-Agent": this.USER_AGENT
        },
        body: body
      });
      const { access_token } = await res.json();
      this.accessToken = access_token;
    } catch (_err) {
      console.error(_err);
      throw new Error("Reddit Client could not be initialized");
    }
  };

  public search = async (term: string) => {
    try {
      let res = await fetch(
        `http://oauth.reddit.com/subreddits/search?q=${term}`,
        {
          headers: {
            "Content-type": "application/json; charset=utf-8",
            Authorization: `Bearer ${this.accessToken}`,
            "User-Agent": this.USER_AGENT
          }
        }
      );
      let data: RedditSearchResponse = await res.json();
      return data.data.children;
    } catch (error) {
      throw error;
    }
  };
}

export default Client;
