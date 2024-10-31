import { Box, Link, Stack, Typography } from '@mui/joy';
import { PageWithUrl } from '../../types';
import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  pages: PageWithUrl[];
}

const Navigation: FC<Props> = ({ pages }) => {
  return (
    <Box component='nav'>
      <Stack direction='row' spacing={1}>
        <Typography>Homework 65</Typography>
        {pages?.map((x) => (
          <Link key={x.url} to={`pages/${x.url}`} component={NavLink}>
            {x.title}
          </Link>
        ))}
        <Link to={`pages/admin`} component={NavLink}>
          Admin
        </Link>
      </Stack>
    </Box>
  );
};

export default memo(Navigation, (prev, next) => {
  if (prev.pages.length !== next.pages.length) {
    return false;
  }

  return Array.from({ length: prev.pages.length }, (_, i) => i).every(
    (_, i) =>
      prev.pages[i].title === next.pages[i].title &&
      prev.pages[i].url === next.pages[i].url
  );
});
