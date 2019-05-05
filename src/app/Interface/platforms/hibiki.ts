declare module HibikiResponse {

  export interface PcImageInfo {
    width: number;
    height: number;
  }

  export interface SpImageInfo {
    width: number;
    height: number;
  }

  export interface Video {
    id: number;
    duration: number;
    live_flg: boolean;
    delivery_start_at?: any;
    delivery_end_at?: any;
    dvr_flg: boolean;
    replay_flg: boolean;
    media_type: number;
  }

  export interface AdditionalVideo {
    id: number;
    duration: number;
    live_flg: boolean;
    delivery_start_at?: any;
    delivery_end_at?: any;
    dvr_flg: boolean;
    replay_flg: boolean;
    media_type: number;
  }

  export interface PcImageInfo2 {
    width: number;
    height: number;
  }

  export interface SpImageInfo2 {
    width: number;
    height: number;
  }

  export interface EpisodePart {
    id: number;
    sort_order: number;
    description: string;
    pc_image_url: string;
    pc_image_info: PcImageInfo2;
    sp_image_url: string;
    sp_image_info: SpImageInfo2;
    updated_at: string;
  }

  export interface PcImageInfo3 {
    width: number;
    height: number;
  }

  export interface SpImageInfo3 {
    width: number;
    height: number;
  }

  export interface Chapter {
    id: number;
    start_time: number;
    pc_image_url: string;
    pc_image_info: PcImageInfo3;
    sp_image_url: string;
    sp_image_info: SpImageInfo3;
    name: string;
    description: string;
  }

  export interface Episode {
    id: number;
    program_id: number;
    program_name: string;
    name: string;
    media_type: number;
    video: Video;
    additional_video: AdditionalVideo;
    html_description: string;
    link_url: string;
    updated_at: string;
    episode_parts: EpisodePart[];
    chapters: Chapter[];
  }

  export interface PcImageInfo4 {
    width: number;
    height: number;
  }

  export interface SpImageInfo4 {
    width: number;
    height: number;
  }

  export interface ProgramLink {
    id: number;
    name: string;
    pc_image_url: string;
    pc_image_info: PcImageInfo4;
    sp_image_url: string;
    sp_image_info: SpImageInfo4;
    link_url: string;
  }

  export interface PcImageInfo5 {
    width: number;
    height: number;
  }

  export interface SpImageInfo5 {
    width: number;
    height: number;
  }

  export interface Cast {
    id: number;
    name: string;
    roll_name: string;
    pc_image_url: string;
    pc_image_info: PcImageInfo5;
    sp_image_url: string;
    sp_image_info: SpImageInfo5;
    publish_start_at: string;
    publish_end_at?: any;
    updated_at: string;
  }

  export interface SegmentPart {
    id: number;
    sort_order?: any;
    description: string;
    pc_image_url: string;
    pc_image_info?: any;
    sp_image_url: string;
    sp_image_info?: any;
    updated_at: string;
  }

  export interface Segment {
    id: number;
    name: string;
    segment_parts: SegmentPart[];
    html_description: string;
    publish_start_at: string;
    publish_end_at?: any;
    updated_at: string;
  }

  export interface RootObject {
    access_id: string;
    id: number;
    name: string;
    name_kana: string;
    day_of_week: number;
    description: string;
    pc_image_url: string;
    pc_image_info: PcImageInfo;
    sp_image_url: string;
    sp_image_info: SpImageInfo;
    onair_information: string;
    message_form_url: string;
    email: string;
    new_program_flg: boolean;
    copyright: string;
    priority: number;
    meta_title: string;
    meta_keyword: string;
    meta_description: string;
    hash_tag: string;
    share_text: string;
    share_url: string;
    cast: string;
    publish_start_at: string;
    publish_end_at?: any;
    updated_at: string;
    latest_episode_id: number;
    latest_episode_name: string;
    episode_updated_at: string;
    update_flg: boolean;
    episode: Episode;
    chapter_flg: boolean;
    additional_video_flg: boolean;
    segment_count: number;
    program_information_count: number;
    product_information_count: number;
    user_favorite_flg: boolean;
    program_links: ProgramLink[];
    casts: Cast[];
    segments: Segment[];
  }

  export interface Stream {
    token: string;
    playlist_url: string;
  }

}

