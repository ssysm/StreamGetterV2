export interface Platform {
  streamList: Array<StreamList>;
  showStreamListTable: boolean;
  loadStreamList();
}

export interface StreamList {
  res: any;
  type: any;
  uri: any;
}
