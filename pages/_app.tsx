import { useEffect } from 'react';
import '../styles/style.scss';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from '../context/AuthContext';
import userAPI from '../api/userAPI';
import { getCookie } from '../helpers/cookies';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (getCookie('accessToken')) {
      userAPI.checkAuth();
    }
  }, []);

  return (
    <AuthContextProvider>
      <Layout>
        <Head>
          <title>My HoReCa</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </AuthContextProvider>
  );
}
