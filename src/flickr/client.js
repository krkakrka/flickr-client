import { getPageQuery, flickrRespToInternal } from './utils';

const flickrAPIFailed = (body) => body.stat && body.stat === 'fail';

const fetchPage = async (page) => {
  const response = await fetch(getPageQuery(page));
  if (response.ok) {
    const body = await response.json();
    if (flickrAPIFailed(body)) {
      throw new Error(`Flickr API error: ${body.message}`);
    } else {
      return flickrRespToInternal(body);
    }
  } else {
    throw new Error(`Network error ${response.status}`);
  }
};

export { fetchPage };
