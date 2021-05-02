import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import compression from 'compression';
import logger, { logStream } from './src/utils/logger.js';
import routes from './src/routes.js';
import * as errorHandler from './src/middlewares/errorHandler.js';
import './src/env.js';

const app = express();

const APP_PORT =
  (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '8080';
const APP_HOST = process.env.APP_HOST || '127.0.0.1';

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

// works with cross-origin clients
app.use(cors());
// secures express app by setting various HTTP headers
app.use(helmet());
app.use(compression());
app.use(morgan('tiny', { stream: logStream }));
app.use(express.json());
app.use(errorHandler.bodyParser);

// API Routes
app.use('/', routes);

// Error Middleware
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);

app.listen(app.get('port'), app.get('host'), () => {
  logger.info(`Server started at http://${app.get('host')}:${app.get('port')}`);
});

export default app;
