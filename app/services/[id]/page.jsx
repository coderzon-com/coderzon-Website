import {redirect } from 'next/navigation'
import ServicesSingle from '@/components/pages/services/service-single';
import servicesData from '@/components/data/services-data';

export async function generateMetadata({ params }) {
  const service = servicesData.find(s => s.id === params.id);
  if (!service) {
    return {
      title: "Service Not Found",
      description: "No service matches your request.",
    };
  }
  return {
    title: service.title,
    description: service.description || 'Service details page',
    openGraph: {
      title: service.title,
      description: service.description || 'Service details page',
    },
  };
}

const ServicesDetail = ({params}) => {
    const serviceDetails = servicesData?.find((service) => service.id === params.id);
    if (!serviceDetails) {
        return redirect("/404-error");
    }
    return (
        <>
            <ServicesSingle serviceDetails={serviceDetails} />
        </>
    );
};

export default ServicesDetail;