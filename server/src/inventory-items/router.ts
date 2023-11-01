import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { client } from '../db/client';

import * as queries from './inventory-items.queries';

export const inventoryItemsRouter = router({
  create: publicProcedure
    .input(z.object({ 
      name: z.string(), 
      description: z.string(), 
      serial: z.string(), 
      quantity: z.number() 
    }))
    .mutation(async (opts) => {
      return await queries.insertInventoryItem.run({ item: opts.input }, client);
    }),
  list: publicProcedure
    .query(async (opts) => {
      return await queries.findAllInventoryItems.run(undefined, client);
    }),
  update: publicProcedure
    .input(z.object({ 
      id: z.number(),
      name: z.string(), 
      description: z.string(), 
      serial: z.string(), 
      quantity: z.number() 
    }))
    .mutation(async (opts) => {
      return await queries.updateInventoryItem.run(opts.input, client);
    }),
  delete: publicProcedure
    .input(z.object({ 
      id: z.number()
    }))
    .mutation(async (opts) => {
      return await queries.deleteInventoryItem.run(opts.input, client);
    })
});
