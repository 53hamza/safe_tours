import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from '@/components/MainLayout'
// import 'swiper/css';

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || MainLayout

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} />
    </Layout>
  );
}

export default MyApp
