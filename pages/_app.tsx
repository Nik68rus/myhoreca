import { Provider } from 'react-redux';
import '../styles/style.scss';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { store } from '../redux/store';
import flatpickr from 'flatpickr';
import locale from 'flatpickr/dist/l10n/ru';
flatpickr.localize(locale.ru!);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Head>
          <title>Круассан</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </Provider>
  );
}
