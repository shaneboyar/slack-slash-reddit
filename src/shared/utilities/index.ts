import { Request } from "express";
import { ActionsPayload } from "$types";

export const generateUUID = (payload: Request | ActionsPayload) => {
  if ((payload as Request).body) {
    const { team_id, channel_id, user_id } = (payload as Request).body;
    return team_id + channel_id + user_id;
  } else {
    const {
      user: { id: user_id, team_id },
      channel: { id: channel_id }
    } = payload as ActionsPayload;
    return team_id + channel_id + user_id;
  }
};
