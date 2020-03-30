import {
  queryToQueryParams,
  getPageQuery,
  flickRespPhotoTointernalPhoto,
  flickrRespToInternal
} from './utils';
import flickrFixture from './fixtures.json';

describe('queryToQueryParams', () => {
  it('should handle empty objects correctly', () => {
    expect(queryToQueryParams({})).toBe('');
  });
  it('should handle objects with 1 key correctly', () => {
    expect(queryToQueryParams({ key: 123 })).toBe('key=123');
  });
  it('should handle objects with more than 1 key correctly', () => {
    expect(queryToQueryParams({ key1: 123, key2: 456 })).toBe('key1=123&key2=456');
  });
});

describe('getPageQuery', () => {
  it('should handle no page input', () => {
    expect(getPageQuery()).toBe('https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=902e6435893b56351c894be1a213ecbd&format=json&nojsoncallback=1&per_page=5&extras=owner_name,url_n&page=1');
  });
  it('should update query with different page', () => {
    expect(getPageQuery(2)).toBe('https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=902e6435893b56351c894be1a213ecbd&format=json&nojsoncallback=1&per_page=5&extras=owner_name,url_n&page=2');
  });
});

describe('flickRespPhotoTointernalPhoto', () => {
  it('should convert flickrs responses photo shape to internal shape correctly', () => {
    const internalShape = flickRespPhotoTointernalPhoto(flickrFixture.photos.photo[0]);
    const expectedInternalShape = {
      id: "49715784143",
      img: "https://live.staticflickr.com/65535/49715784143_b52571107e_n.jpg",
      imgH: 213,
      imgW: 320,
      owner: "macmmh",
      title: "Kingfisher -202003270877.jpg"
    };
    expect(internalShape).toEqual(expectedInternalShape);
  });
});

describe('flickrRespToInternal', () => {
  it('should convert flickrs responses internal shape correctly', () => {
    const internalShape = flickrRespToInternal(flickrFixture);
    expect(internalShape).toHaveProperty('page');
    expect(internalShape.page).toBe(flickrFixture.photos.page);

    expect(internalShape).toHaveProperty('pages');
    expect(internalShape.pages).toBe(flickrFixture.photos.pages);

    expect(internalShape).toHaveProperty('perPage');
    expect(internalShape.perPage).toBe(flickrFixture.photos.perpage);

    expect(internalShape).toHaveProperty('total');
    expect(internalShape.total).toBe(flickrFixture.photos.total);

    expect(internalShape).toHaveProperty('photos');
    expect(internalShape.photos.length).toBe(flickrFixture.photos.photo.length);
  });
});
