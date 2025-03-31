import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// app.get('/', (req, res) => {
//   res.redirect('/home');
// });

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application and set CSP header and nonce in the html response.
 */
app.use(async (req, res, next) => {
  try {
    // create a nonce
    const nonce = crypto
      .randomBytes(16)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Waiting for the response from Angular SSR
    const renderResponse = await angularApp.handle(req);

    if (!renderResponse || !renderResponse.text) {
      // If no HTML is returned, send 500 error response
      return res.status(500).send('SSR Rendering failed');
    }

    // Extract the HTML
    const htmlResponse = await renderResponse.text();

    // Add nonce to <script> and <style> tags
    const updatedHtml = htmlResponse
      .replace(/<script.*?>/g, (match) => {
        return match.replace(/<script/g, `<script nonce="${nonce}"`);
      })
      .replace(/<style.*?>/g, (match) => {
        return match.replace(/<style/g, `<style nonce="${nonce}"`);
      });

    // Set the Content-Security-Policy header
    const cspHeader = [
      "default-src 'self';",
      `script-src 'self' 'nonce-${nonce}';`,
      `style-src 'self' 'nonce-${nonce}';`,
      "img-src 'self' data:;",
      "connect-src 'self' https://api.example.com;",
      "frame-src 'self' https://identity-provider.com;",
      "object-src 'none';",
      "base-uri 'self';",
      "form-action 'self';",
    ]
      .join(' ')
      .replace(/\s+/g, ' ');

    res.setHeader('Content-Security-Policy', cspHeader);

    // Send the response to the client
    res.send(updatedHtml); // `return` hinzufügen, damit der Codepfad endet
  } catch (error) {
    next(error); // Fehler an den nächsten Middleware-Handler weitergeben
  } finally {
    return;
  }
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
