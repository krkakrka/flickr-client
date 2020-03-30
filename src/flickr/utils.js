const DOMAIN = 'https://www.flickr.com/services/rest/';
const QUERY = {
  method: 'flickr.photos.getRecent',
  api_key: '902e6435893b56351c894be1a213ecbd',
  format: 'json',
  nojsoncallback: 1,
  per_page: 5,
  extras: 'owner_name,url_n'
};

const queryToQueryParams = (queryObj) => (
  Object.entries(queryObj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
);

const getPageQuery = (page = 1) => (
  `${DOMAIN}?${queryToQueryParams({ ...QUERY, page })}`
);

const flickRespPhotoTointernalPhoto = (flickPhoto) => ({
  id: flickPhoto.id,
  title: flickPhoto.title,
  owner: flickPhoto.ownername,
  img: flickPhoto.url_n,
  imgW: flickPhoto.width_n,
  imgH: flickPhoto.height_n
});

const flickrRespToInternal = (flickrResp) => ({
  page: flickrResp.photos.page,
  pages: flickrResp.photos.pages,
  perPage: flickrResp.photos.perpage,
  total: flickrResp.photos.total,
  photos: flickrResp.photos.photo.map(flickRespPhotoTointernalPhoto)
});

export {
  queryToQueryParams,
  getPageQuery,
  flickRespPhotoTointernalPhoto,
  flickrRespToInternal
}
