import '../styles/globals.scss';
import { Layout } from '@components';

function MyApp({ Component, pageProps }) {

  return (
    <Layout>
      <h1>lol</h1>
      <Component {...pageProps} />
    </Layout>
  ) 
}

export default MyApp