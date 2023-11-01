import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = trpc.inferAsyncReturnType<typeof createContext>;

const t = trpc.initTRPC.context<Context>().create();
 
export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;