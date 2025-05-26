import data from '@/components/data/product_platform-data';
import Product_and_platform_main from '@/components/pages/product&platforms';
import React from 'react';
export async function generateMetadata({params}) {
  const product=data.find((prod)=>prod.id === params.id)
  if(product){
    return{
      title:product.title,
      description:product.p1,
      openGraph:{
        title:product.title,
      description:product.p1
      }
    }
  }
}
const page = ({params}) => {
  return (
    <div>
      <Product_and_platform_main product_id={params.id}/>
    </div>
  );
}

export default page;
