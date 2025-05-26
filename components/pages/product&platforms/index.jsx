import HeaderOne from '@/components/layout/headers/header/header-one';
import React from 'react';
import Product_and_Platforms from './page';
import BreadCrumb from '../common/breadcrumb';
import data from '@/components/data/product_platform-data';
import MainContact from '../contacts/MainContact';
import FooterOne from '@/components/layout/footers/footer-one';
import ScrollToTop from '../common/scroll/scroll-to-top';

const Product_and_platform_main = ({product_id }) => {
  const product=data.find((prod)=>prod.id === product_id)
  const word=product.title.split(':').slice(0,1)
  return (
    <div>
      <HeaderOne/>
      <BreadCrumb title={word} innerTitle={product?.title} />
      <Product_and_Platforms id={product_id }/>
      <MainContact/>
      <FooterOne/>
      <ScrollToTop/>
    </div>
  );
}

export default Product_and_platform_main;
{}