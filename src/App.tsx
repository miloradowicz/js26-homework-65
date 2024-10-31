import { Box } from '@mui/joy';
import { Outlet, useOutletContext } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import { PageWithUrl } from './types';
import { useCallback, useEffect, useState } from 'react';
import Api from './lib/api';

interface Context {
  reload: () => Promise<void>;
}

function App() {
  const [pages, setPages] = useState<PageWithUrl[]>([]);

  const loader = useCallback(async () => {
    const data = await Api.getPages();

    setPages(data ?? []);
  }, []);

  useEffect(() => {
    loader();
  }, [loader]);

  const reload = useCallback(async () => {
    await loader();
  }, [loader]);

  return (
    <>
      <Box
        component='header'
        sx={{
          p: 2,
          bgcolor: 'background.surface',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
          position: 'sticky',
          top: 0,
          zIndex: 1100,
        }}
      >
        <Navigation pages={pages} />
      </Box>
      <Box
        component='main'
        sx={{ p: 2, display: 'flex', justifyContent: 'center' }}
      >
        <Outlet context={{ reload } satisfies Context} />
      </Box>
    </>
  );
}

export const useReload = () => {
  return useOutletContext<Context>();
};

export default App;
