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

const router = createBrowserRouter(
  createRoutesFromElements(<Route path='/' element={<App />} />)
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
