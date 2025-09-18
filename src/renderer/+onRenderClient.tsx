import { createRoot } from 'react-dom/client';

type PageContext = {
  Page: React.ComponentType;
  pageProps: any;
  urlPathname: string;
  [key: string]: any;
};

async function onRenderClient(pageContext: PageContext) {
  const { Page, pageProps } = pageContext;
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element with id "root" not found');
  }
  createRoot(rootElement).render(<Page {...pageProps} />);
}

export { onRenderClient };
