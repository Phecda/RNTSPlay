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

async function fetchData<T = any>(url: string) {
  return fetch(url, { method: 'GET' })
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

export function fetchCategory({ first = 0, adult = true }: RequestParamBase) {
  return fetchData<{ category: ADWallPaperCategory[] }>(
    `http://service.picasso.adesk.com/v1/vertical/category?adult=${adult}&first=${first}`
  );
}

export function fetchWallpapersInCategory(
  { limit = 20, adult = true, first = 0, offset, order }: RequestParamPaged,
  categoryId?: string
) {
  const url = categoryId
    ? `http://service.picasso.adesk.com/v1/vertical/category/${categoryId}/vertical?limit=${limit}&adult=${adult}&first=${first}&skip=${offset}&order=${order}`
    : `http://service.picasso.adesk.com/v1/vertical/vertical?limit=${limit}&adult=${adult}&first=${first}&skip=${offset}&order=${order}`;
  return fetchData<{ vertical: ADWallPaper[] }>(url);
}

export function fetchCommentOfWallpaper(wallpaperID: string) {
  return fetchData<{
    comment: ADWallpaperComment[];
    hot: ADWallpaperComment[];
    meta: any;
    vertical: any;
  }>(
    `http://service.picasso.adesk.com/v2/vertical/vertical/${wallpaperID}/comment`
  );
}
