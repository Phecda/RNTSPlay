/**
 * @see https://github.com/jokermonn/-Api/blob/master/adesk.md#%E6%89%8B%E6%9C%BA%E5%A3%81%E7%BA%B8%E7%9B%B8%E5%85%B3
 */

interface RequestParamBase {
  first?: number;
  adult?: boolean;
}

interface RequestParamPaged extends RequestParamBase {
  offset: number;
  order: 'hot' | 'new';
  limit?: number;
}

interface Response<R = any> {
  code: number;
  msg: string;
  res: R;
}

function fetchData<T = any>(url: string) {
  return fetch(url, {
    method: 'GET',
    headers: { 'User-Agent': 'lightwp,198,appstore' },
  })
    .then(response => {
      if (response.ok) {
        return response.text();
      }
      throw Error(response.statusText);
    })
    .then(responseText => {
      return JSON.parse(responseText);
    })
    .then((json: Response<T>) => {
      if (json.code !== 0) {
        throw Error(json.msg);
      }
      return json.res;
    });
}

export interface Category {
  ename: string;
  name: string;
  id: string;
  desc: string;
  cover: string;
}

export function fetchCategories({ first = 0, adult = true }: RequestParamBase) {
  return fetchData<{ category: Category[] }>(
    `http://service.picasso.adesk.com/v1/vertical/category?adult=${Number(
      adult
    )}&first=${first}`
  );
}

export interface WallPaper {
  atime: number;
  thumb: string;
  id: string;
  img: string;
  preview: string;
  rule: string;
  /**
   * 请求时需要设置User-Agent 为 `lightwp,198,appstore` 才有
   */
  user?: User;
}

export interface User {
  avatar: string;
  name: string;
  follower: number;
}

export function fetchWallpapersInCategory(
  { limit = 20, adult = true, first = 0, offset, order }: RequestParamPaged,
  categoryId?: string
) {
  const url = categoryId
    ? `http://service.picasso.adesk.com/v1/vertical/category/${categoryId}/vertical?limit=${limit}&adult=${Number(
        adult
      )}&first=${first}&skip=${offset}&order=${order}`
    : `http://service.picasso.adesk.com/v1/vertical/vertical?limit=${limit}&adult=${Number(
        adult
      )}&first=${first}&skip=${offset}&order=${order}`;
  return fetchData<{ vertical: WallPaper[] }>(url);
}

export interface Comment {
  atime: number;
  content: string;
  user: User;
  size: number;
  reply_user: User | {};
}

export function fetchCommentOfWallpaper(wallpaperID: string) {
  return fetchData<{
    comment: Comment[];
    hot: Comment[];
    meta: any;
    vertical: any;
  }>(
    `http://service.picasso.adesk.com/v2/vertical/vertical/${wallpaperID}/comment`
  );
}

export function searchWallpaper(
  { limit = 20, adult = true, first = 0, offset, order }: RequestParamPaged,
  keyword: string
) {
  const url = `http://so.picasso.adesk.com/v1/search/vertical/resource/${encodeURIComponent(
    keyword
  )}?limit=${limit}&adult=${Number(
    adult
  )}&first=${first}&skip=${offset}&order=${order}`;
  return fetchData<{ vertical: WallPaper[] }>(url);
}
