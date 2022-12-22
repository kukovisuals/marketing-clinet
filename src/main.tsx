import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Provider} from 'react-redux';
import {store} from './app/store'

const theme = createTheme({
  palette: {
    background: {
      default: '#e8e8e8',
    }
  },
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>

)
