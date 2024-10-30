import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import '@fontsource/inter/cyrillic.css';

import App from './App.tsx';
import { CssBaseline, CssVarsProvider } from '@mui/joy';

import Home from './containers/Home/Home.tsx';
import Presenter from './containers/Presenter/Presenter.tsx';
import Admin from './containers/Admin/Admin.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='pages'>
        <Route path=':title' element={<Presenter />} />
        <Route path='admin'>
          <Route index element={<Admin />} />
          <Route path=':title' element={<Admin />} />
          <Route path='new' element={<Admin />} />
        </Route>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssVarsProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </CssVarsProvider>
  </StrictMode>
);
