import axios from 'axios';
import { Page } from '../types';

const baseUrl =
  'https://js26-na-default-rtdb.europe-west1.firebasedatabase.app/hw-65/';

type ApiPage = Omit<Page, 'id'>;

type ApiPageContainer = {
  [name: string]: ApiPage;
};

export const getPages = async (): Promise<Page[]> => {
  const endpoint = 'pages.json';

  const { data, status } = await axios.get<ApiPageContainer | null>(
    new URL(endpoint, baseUrl).href
  );

  if (status !== 200) {
    throw new Error();
  }

  return (
    (data && Object.entries(data).map(([id, page]) => ({ id, ...page }))) || []
  );
};

export const getPage = async (id: string): Promise<Page | null> => {
  const endpoint = `pages/${id}.json`;

  const { data, status } = await axios.get<ApiPage | null>(
    new URL(endpoint, baseUrl).href
  );

  if (status !== 200) {
    throw new Error();
  }

  return (data && { id, ...data }) || null;
};

export const deletePage = async (id: string): Promise<null> => {
  const endpoint = `pages/${id}.json`;

  const { data, status } = await axios.delete<null>(
    new URL(endpoint, baseUrl).href
  );

  if (status !== 200) {
    throw new Error();
  }

  return data;
};
