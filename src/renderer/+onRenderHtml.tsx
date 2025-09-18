import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { dangerouslySkipEscape, escapeInject } from 'vike/server';

async function onRenderHtml(pageContext: any) {
  const { Page, pageProps } = pageContext;
  const sheet = new ServerStyleSheet();
  const pageHtml = renderToString(sheet.collectStyles(<Page {...pageProps} />));
  const styleTags = sheet.getStyleTags();

  return escapeInject`
<!doctype html>
<html lang="en">
  <head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
${dangerouslySkipEscape(styleTags)}
  </head>
  <body>
    <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
  </body>
</html>
`;
}

export { onRenderHtml };
