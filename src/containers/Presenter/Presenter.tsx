import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '../../types';
import Api from '../../lib/api';
import { Box } from '@mui/joy';
import ContentLayout from '../../components/ContentLayout/ContentLayout';

const Presenter = () => {
  const { url } = useParams();
  const [page, setPage] = useState<Page>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const loader = async () => {
      try {
        if (!url) {
          throw new Error('Path not found.');
        }

        const data = await Api.getPage(url);

        if (!data) {
          throw new Error('Page not found.');
        }

        setPage(data);
      } catch (err) {
        setError(err);
      }
    };

    loader();
  }, [url]);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return (
    <ContentLayout>
      <h3>{page?.title}</h3>
      <Box>{page?.content}</Box>
    </ContentLayout>
  );
};

export default Presenter;
