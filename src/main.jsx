import React from 'react';
import {createRoot} from 'react-dom/client';
import App from '@den/shared/App';
import '@den/shared/style.css';
createRoot(document.getElementById('root')).render(<React.StrictMode><App role='rider'/></React.StrictMode>);
