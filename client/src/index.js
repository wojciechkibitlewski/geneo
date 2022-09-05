import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

import { QueryClient, QueryClientProvider } from "react-query";


const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
            <Route path="/*" element={<App />} />
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
