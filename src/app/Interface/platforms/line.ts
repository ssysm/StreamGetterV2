declare module LineLiveResponse {

  export interface LiveHLSURLs {
    abr: string;
    aac: string;
    720: string;
    480: string;
    360: string;
    240?: any;
    144?: any;
  }

  export interface ArchivedHLSURLs {
    abr?: any;
    aac?: any;
    720?: any;
    480?: any;
    360?: any;
    240?: any;
    144?: any;
  }

  export interface Chat {
    url: string;
    archiveURL?: any;
    ownerMessageURL: string;
  }

  export interface RootObject {
    liveHLSURLs: LiveHLSURLs;
    archivedHLSURLs: ArchivedHLSURLs;
    liveStatus: string;
    apistatusCode: number;
    chat: Chat;
    isFollowing?: any;
    isOAFollowRequired: boolean;
    isChannelBlocked: boolean;
    isCollaborating: boolean;
    isCollaboratable: boolean;
    canRequestCollaboration: boolean;
    paidLive?: any;
    status: number;
  }

}

