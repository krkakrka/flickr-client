import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import ImageGridList from './ImageGridList';
import mockFlickrFixture from '../../fixtures.json';
import { fetchPage } from '../../flickr';

jest.mock('../../flickr', () => ({
  fetchPage: jest.fn()
}));

describe('<ImageGridList>', () => {
  beforeEach(() => {
    fetchPage
      .mockResolvedValueOnce({
        page: 1,
        pages: 2,
        photos: mockFlickrFixture.photos.photo.slice(0, 2)
      })
      .mockResolvedValue({
        page: 2,
        pages: 2,
        photos: mockFlickrFixture.photos.photo.slice(2, 4)
      });
  });
  afterEach(() => {
    fetchPage.mockReset();
  });

  it('should render', async () => {
    await act(async () => {
      render(<ImageGridList />);
    });
  });
  describe('image loading', () => {
    it('should load some images initially', async () => {
      // const renderResult = await act(async () => render(<App />));
      let renderResult;
      await act(async () => {
        renderResult = render(<ImageGridList />);
      });
      const images = renderResult.getAllByAltText('flickr');
      expect(images.length).toBe(2);
    });
    it('should load more images when at the bottom of the page', async () => {
      // const renderResult = await act(async () => render(<App />));
      let renderResult;
      await act(async () => {
        renderResult = render(<ImageGridList />);
      });
      await act(async () => {
        // document.documentElement.scrollTop = document.documentElement.scrollHeight;
        fireEvent(window, new Event('scroll'));
      });
      const images = renderResult.getAllByAltText('flickr');
      expect(images.length).toBe(4);
    });
    it('should not load more images on scroll on the last page', async () => {
          // const renderResult = await act(async () => render(<App />));
          let renderResult;
          await act(async () => {
            renderResult = render(<ImageGridList />);
          });
          await act(async () => {
            // document.documentElement.scrollTop = document.documentElement.scrollHeight;
            fireEvent(window, new Event('scroll'));
          });
          await act(async () => {
            // document.documentElement.scrollTop = document.documentElement.scrollHeight;
            fireEvent(window, new Event('scroll'));
          });
          const images = renderResult.getAllByAltText('flickr');
          expect(images.length).toBe(4);
    });
  });
  describe('favourites', () => {
    it('should add favourite', async () => {
      // const renderResult = await act(async () => render(<App />));
      let renderResult;
      await act(async () => {
        renderResult = render(<ImageGridList />);
      });
      const favButton = renderResult.getAllByText('Favourite')[0];
      fireEvent.click(favButton);

      expect(window.localStorage.getItem('favourites')).not.toBeUndefined();
      expect(favButton.textContent).toBe('Unfavourite');
    });

    it('should remove favourite', async () => {
      // const renderResult = await act(async () => render(<App />));
      let renderResult;
      await act(async () => {
        renderResult = render(<ImageGridList />);
      });
      const favButton = renderResult.getAllByText('Favourite')[0];
      fireEvent.click(favButton);
      fireEvent.click(favButton);

      expect(window.localStorage.getItem('favourites')).toBe('[]');
      expect(favButton.textContent).toBe('Favourite');
    });
  });
});
