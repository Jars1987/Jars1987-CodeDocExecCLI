import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { createCellsRouter } from './routes/cells';

export const serve = (
  port: number,
  filename: string,
  dir: string,
  isProduction: boolean
) => {
  const app = express();

  app.use(createCellsRouter(filename, dir));

  if (isProduction) {
    //require resolve get you the absolute path to reach the html file
    const packagePath = require.resolve(
      '@apolo-jsnote/local-client/build/index.html'
    );
    //now that we have the absolute we can dirname to get the build directory
    app.use(express.static(path.dirname(packagePath)));
  } else {
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent',
      })
    );
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
