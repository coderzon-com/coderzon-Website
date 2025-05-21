import HeaderOne from '@/components/layout/headers/header/header-one';
import BreadCrumb from '../common/breadcrumb';
import RequestQuoteMain from './request-quote';
import FooterOne from '@/components/layout/footers/footer-one';
import ScrollToTop from '../common/scroll/scroll-to-top';

export const metadata = {
  title: 'Request Quote',
  description: 'Get in touch to request a quote for our services.', 
};

const RequestQuotePage = () => {
  return (
    <>
      <HeaderOne />
      <BreadCrumb title="Request Quote" innerTitle="Request Quote" />
      <RequestQuoteMain />
      <FooterOne />
      <ScrollToTop />
    </>
  );
};

export default RequestQuotePage;
