import { Router } from "express";
import { ResponseValue, SlackMessage } from "$types";
import { Reddit, Slack } from "$clients";
import { generateUUID } from "$utils";

// Init router and path
const router = Router();
const RedditClient = new Reddit();

const SlackClients: { [uuid: number]: Slack } | {} = {};

router.post("/search", async (req, res, next) => {
  const results = await RedditClient.search(req.body.text);
  const uuid = generateUUID(req);
  SlackClients[uuid] = new Slack();
  SlackClients[uuid].searchResults = results;
  const message = SlackClients[uuid].generateMessage();
  res.json(message);
});

router.post("/response", (req, res, next) => {
  const payload = JSON.parse(req.body.payload);
  const { response_url, channel } = payload;
  const uuid = generateUUID(payload);
  const responseValue = payload.actions[0].value;
  if (responseValue === ResponseValue.DELETE && response_url) {
    SlackClients[uuid].deleteMessage(response_url);
  } else if (responseValue === ResponseValue.NEXT && response_url) {
    SlackClients[uuid].replaceWithNextOption(response_url);
  } else {
    const messageBlock = JSON.parse(responseValue);
    const message: SlackMessage = {
      text: "Test",
      blocks: [messageBlock]
    };
    SlackClients[uuid].deleteMessage(response_url);
    SlackClients[uuid].publishMessage(channel.id, message);
    delete SlackClients[uuid];
  }
});

// Export the base-router
export default router;
