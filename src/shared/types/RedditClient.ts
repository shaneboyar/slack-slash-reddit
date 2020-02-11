import { SlackMessage } from "./Slack";

export type RedditSearchData = {
  modhash: string;
  dist: number;
  children: RedditSearchResult[];
  after: string | null;
  before: string | null;
};

export type RedditSearchResponse = {
  kind: string;
  data: RedditSearchData;
};

export type SubredditData = {
  user_flair_background_color: null;
  submit_text_html: string;
  restrict_posting: boolean;
  user_is_banned: boolean | null;
  free_form_reports: boolean;
  wiki_enabled: boolean;
  user_is_muted: null;
  user_can_flair_in_sr: null;
  display_name: string;
  header_img: string;
  title: string;
  icon_size: [number, number];
  primary_color: string;
  active_user_count: null;
  icon_img: string;
  display_name_prefixed: string;
  accounts_active: number | null;
  public_traffic: boolean;
  subscribers: number;
  user_flair_richtext: string[];
  name: string;
  quarantine: boolean;
  hide_ads: boolean;
  emojis_enabled: boolean;
  advertiser_category: string;
  public_description: string;
  comment_score_hide_mins: number;
  user_has_favorited: boolean | null;
  user_flair_template_id: null;
  community_icon: string;
  banner_background_image: string;
  original_content_tag_enabled: boolean;
  submit_text: string;
  description_html: string;
  spoilers_enabled: boolean;
  header_title: string;
  header_size: [number, number];
  user_flair_position: string;
  all_original_content: boolean;
  has_menu_widget: boolean;
  is_enrolled_in_new_modmail: null;
  key_color: string;
  can_assign_user_flair: boolean;
  created: number;
  wls: number;
  show_media_preview: boolean;
  submission_type: string;
  user_is_subscriber: null;
  disable_contributor_requests: boolean;
  allow_videogifs: boolean;
  user_flair_type: string;
  allow_polls: boolean;
  collapse_deleted_comments: boolean;
  emojis_custom_size: null;
  public_description_html: string;
  allow_videos: boolean;
  is_crosspostable_subreddit: boolean;
  suggested_comment_sort: null;
  can_assign_link_flair: boolean;
  accounts_active_is_fuzzed: boolean;
  submit_text_label: string;
  link_flair_position: string;
  user_sr_flair_enabled: null;
  user_flair_enabled_in_sr: boolean;
  allow_discovery: boolean;
  user_sr_theme_enabled: boolean;
  link_flair_enabled: boolean;
  subreddit_type: string;
  notification_level: string;
  banner_img: string;
  user_flair_text: null;
  banner_background_color: string;
  show_media: boolean;
  id: string;
  user_is_contributor: boolean | null;
  over18: boolean;
  description: string;
  submit_link_label: string;
  user_flair_text_color: null;
  restrict_commenting: boolean;
  user_flair_css_class: null;
  allow_images: boolean;
  lang: string;
  whitelist_status: string;
  url: string;
  created_utc: number;
  banner_size: [number, number];
  mobile_banner_image: string;
  user_is_moderator: boolean | null;
};

export type RedditSearchResult = {
  kind: string;
  data: SubredditData;
};

export declare class RedditClient {
  protected accessToken?: string;
  protected searchResults?: RedditSearchResult[];

  public build(): void;
  public search(term: string): Promise<SlackMessage>;
}
