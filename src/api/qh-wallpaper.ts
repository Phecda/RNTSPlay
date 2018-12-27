type numberStr = string;

interface RequestParam {
  offset: number;
  count?: number;
}

interface Response<T = any> {
  errno: numberStr;
  errmsg: string;
  consume: numberStr;
  total: numberStr;
  data: T[];
}

function fetchData<T = any>(url: string) {
  return fetch(url, {
    method: 'GET',
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
      if (json.errno !== '0') {
        throw Error(json.errmsg);
      }
      return json;
    });
}

export function fetchCategories() {
  return fetchData<QHCategory>(
    'http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=getAllCategories'
  );
}

export function fetchWallpapersInCategory(
  { offset, count = 30 }: RequestParam,
  categoryId: numberStr
) {
  const url = `http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=getAppsByCategory&cid=${categoryId}&start=${offset}&count=${count}`;
  return fetchData<QHWallpaper>(url);
}

export function searchWallPaper(
  { offset, count = 30 }: RequestParam,
  keyword: string
) {
  const encodedKW = encodeURIComponent(keyword);
  const url = `http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&start=${offset}&count=${count}&kw=${encodedKW}`;
  return fetchData<QHWallpaperdDetail>(url);
}
