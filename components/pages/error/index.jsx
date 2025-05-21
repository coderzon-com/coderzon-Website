import Error from './error'; 

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}
const ErrorPage = () => {
  return <Error />;
};

export default ErrorPage;
