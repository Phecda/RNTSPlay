declare interface QHCategory {
  id: string;
  name: string;
  totalcnt: string;
  create_time: string;
  displaytype: string;
}

declare interface QHWallpaper {
  pid: string;
  cid: string;
  url: string;
  fav_total: string;
}

declare interface QHWallpaperdDetail {
  [key: string]: any;
}
