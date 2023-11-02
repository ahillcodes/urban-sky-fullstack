import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import cors from 'cors';

import { createContext } from './trpc';
import { appRouter } from './router';

const app = express();
const port = 3000;

app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.listen(port, () => { console.log(`Application running on port ${port}`)});