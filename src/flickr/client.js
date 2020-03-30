import { getPageQuery, flickrRespToInternal } from './utils';

const fetchPage = async (page) => {
  const response = await fetch(getPageQuery(page));
  if (response.ok) {
    const body = await response.json();
    return flickrRespToInternal(body);
  } else {
    throw new Error(`Network error ${response.status}`);
  }
};

export { fetchPage };
