export interface BilibiliRealRoomResponse {
  code: number;
  data: {
    room_id: string
  };
}

export interface BilibiliStreamResponse {
  durl: Array<any>;
}
