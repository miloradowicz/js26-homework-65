import { useRouteError } from 'react-router-dom';
import ContentLayout from '../../components/ContentLayout/ContentLayout';

const ErrorPage = () => {
  const error = useRouteError() as Error;

  return (
    <ContentLayout>
      <h3>Error</h3>
      <p>{error.message}</p>
    </ContentLayout>
  );
};

export default ErrorPage;
