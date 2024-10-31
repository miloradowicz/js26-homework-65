import axios from 'axios';
import dashify from 'dashify';

import { Id, Page, PageWithUrl } from '../types';

const baseUrl =
  'https://js26-na-default-rtdb.europe-west1.firebasedatabase.app/hw-65/';

type ApiPage = PageWithUrl;

type ApiId = {
  name: string;
};

type ApiPageContainer = {
  [name: string]: ApiPage;
};

const getPages = async (): Promise<PageWithUrl[]> => {
  const endpoint = 'pages.json';

  const { data, status } = await axios.get<ApiPageContainer | null>(
    new URL(endpoint, baseUrl).href
  );

  if (status !== 200) {
    throw new Error(`Server response: ${status}`);
  }

  return (data && Object.entries(data).map(([, page]) => ({ ...page }))) || [];
};

const createPage = async (page: Page): Promise<Id> => {
  const endpoint = `pages.json`;

  const { data, status } = await axios.post<ApiId | null>(
    new URL(endpoint, baseUrl).href,
    { ...page, url: dashify(page.title) }
  );

  if (status !== 200) {
    throw new Error(`Server response: ${status}`);
  }

  if (!data) {
    throw new Error('Could not create page.');
  }

  return { id: data.name };
};

const getPage = async (url: string): Promise<PageWithUrl> => {
  const endpoint = `pages.json?orderBy="url"&equalTo="${url}"`;

  const { data, status } = await axios.get<ApiPageContainer | null>(
    new URL(endpoint, baseUrl).href
  );

  if (status !== 200) {
    throw new Error(`Server response: ${status}`);
  }

  if (!data) {
    throw new Error('Page not found.');
  }

  const _data = Object.entries(data).map(([, page]) => ({ ...page }));

  if (_data.length === 0) {
    throw new Error('Page not found.');
  }

  if (_data.length !== 1) {
    throw new Error('Path is not unique.');
  }

  return _data[0];
};

const getPageId = async (url: string): Promise<ApiId> => {
  const endpoint = `pages.json?orderBy="url"&equalTo="${url}"`;

  const { data, status } = await axios.get<ApiPageContainer | null>(
    new URL(endpoint, baseUrl).href
  );

  if (status !== 200) {
    throw new Error(`Server response: ${status}`);
  }

  if (!data) {
    throw new Error('Page not found.');
  }

  const _data = Object.entries(data).map(([name]) => ({ name }));

  if (_data.length === 0) {
    throw new Error('Page not found.');
  }

  if (_data.length !== 1) {
    throw new Error('Path is not unique.');
  }

  return _data[0];
};

const updatePage = async (url: string, page: Page): Promise<Page | null> => {
  const _page = await getPageId(url);

  const endpoint = `pages/${_page.name}.json`;

  const { data, status } = await axios.put<Page | null>(
    new URL(endpoint, baseUrl).href,
    { ...page, url: dashify(page.title) }
  );

  if (status !== 200) {
    throw new Error(`Server response: ${status}`);
  }

  return data && { ...data };
};

const deletePage = async (id: string): Promise<null> => {
  const endpoint = `pages/${id}.json`;

  const { data, status } = await axios.delete<null>(
    new URL(endpoint, baseUrl).href
  );

  if (status !== 200) {
    throw new Error(`Server response: ${status}`);
  }

  return data;
};

export default {
  getPages,
  createPage,
  getPage,
  updatePage,
  deletePage,
};
