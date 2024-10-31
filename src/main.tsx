import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { CssBaseline, CssVarsProvider } from '@mui/joy';

import '@fontsource/inter/cyrillic.css';

import App from './App.tsx';
import Home from './components/HomePage/HomePage.tsx';
import Presenter from './containers/Presenter/Presenter.tsx';
import Admin from './containers/Admin/Admin.tsx';
import ErrorPage from './components/ErrorPage/ErrorPage.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='pages' errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path='admin'>
          <Route index element={<Admin />} />
        </Route>
        <Route path=':url' element={<Presenter />} />
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
