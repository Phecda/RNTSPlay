declare interface ADWallPaper {
  thumb: string;
  id: string;
  img: string;
  preview: string;
  rule: string;
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
  gender: number;
  name: string;
}

declare interface ADWallpaperComment {
  atime: number;
  content: string;
  user: ADWallPaperUser;
  size: number;
  reply_user: ADWallPaperUser | {};
}
