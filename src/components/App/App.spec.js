import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import App from './App';
import mockFlickrFixture from '../../fixtures.json';
import { fetchPage } from '../../flickr';

jest.mock('../../flickr', () => ({
  fetchPage: jest.fn()
}));

describe('<App>', () => {
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
      render(<App />);
    });
  });
  it('should load some images initially', async () => {
    // const renderResult = await act(async () => render(<App />));
    let renderResult;
    await act(async () => {
      renderResult = render(<App />);
    });
    const images = renderResult.getAllByAltText('flickr');
    expect(images.length).toBe(2);
  });
  it('should load more images when at the bottom of the page', async () => {
    // const renderResult = await act(async () => render(<App />));
    let renderResult;
    await act(async () => {
      renderResult = render(<App />);
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
          renderResult = render(<App />);
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
