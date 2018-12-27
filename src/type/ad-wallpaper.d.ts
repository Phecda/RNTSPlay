declare interface ADWallPaper {
  atime: number;
  thumb: string;
  id: string;
  img: string;
  preview: string;
  rule: string;
  /**
   * 请求时需要设置User-Agent 为 `lightwp,198,appstore` 才有
   */
  user?: ADWallPaperUser;
}

declare interface ADWallPaperCategory {
  ename: string;
  name: string;
  id: string;
  desc: string;
  cover: string;
}

declare interface ADWallPaperUser {
  avatar: string;
  name: string;
  follower: number;
}

declare interface ADWallpaperComment {
  atime: number;
  content: string;
  user: ADWallPaperUser;
  size: number;
  reply_user: ADWallPaperUser | {};
}
