import { FC, PropsWithChildren } from 'react';
import { Box } from '@mui/joy';

const ContentLayout: FC<PropsWithChildren> = ({ children }) => {
  return <Box sx={{ width: ['100%', '80%', '800px'] }}>{children}</Box>;
};

export default ContentLayout;
