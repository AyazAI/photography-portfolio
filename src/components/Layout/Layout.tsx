import { Suspense } from 'react';
import { usePageContext } from 'vike-react/usePageContext';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pageContext = usePageContext();

  return (
    <>
      <Header />
      <Suspense>{children}</Suspense>
      {pageContext.urlPathname !== '/' &&
        pageContext.urlPathname !== '/home' && <Footer />}
    </>
  );
};
