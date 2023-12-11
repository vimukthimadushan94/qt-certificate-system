import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import CreateCertificate from './components/certificate/CreateCertificate';
import App from './components/layout/App';
import List, { loadCertificates } from './components/certificate/List';
import CertificateDeleteConfirm from './components/certificate/CertificateDeleteConfirm';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App/>} path='/'>
      <Route element={<List/>} path='/' loader={loadCertificates} />
      <Route element={<CreateCertificate/>} path='/certificate/create'/>
      <Route element={<CertificateDeleteConfirm/>} path='/certificate/:certificateId/delete'/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

