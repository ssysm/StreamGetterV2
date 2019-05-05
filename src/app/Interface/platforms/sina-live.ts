declare module SinaLiveResponse {

  export interface Stream {
    title: string;
    type: string;
    url: string;
    default: number;
  }

  export interface RootObject {
    status: string;
    url: string;
    ctime: number;
    image: string;
    prom_video: string;
    avatar: string;
    ispaid: number;
    playtime: number;
    ispaylive: number;
    nickname: string;
    payh5url: string;
    money: number;
    islogin: number;
    author_nickname: string;
    author_avatar: string;
    width: string;
    height: string;
    im: string;
    live_type: string;
    scheme_url: string;
    hidden_comments: number;
    object_type_detail: string;
    server_time: number;
    etime: number;
    serviceid: string;
    stream: Stream[];
  }

}

