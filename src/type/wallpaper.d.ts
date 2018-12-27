declare interface WallPaperProps {
  thumb: string;
  id: string;
  img: string;
  preview: string;
  rule: string;
}

declare interface WallPaperCategoryProps {
  ename: string;
  name: string;
  id: string;
  desc: string;
  cover: string;
}

declare interface WallPaperUser {
  avatar: string;
  gender: number;
  name: string;
}

declare interface WallpaperComment {
  atime: number;
  content: string;
  user: WallPaperUser;
  size: number;
  reply_user: WallPaperUser | {};
}
