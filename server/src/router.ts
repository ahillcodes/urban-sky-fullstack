import { router } from './trpc';
import { inventoryItemsRouter } from './inventory-items/router';
 
export const appRouter = router({
  inventoryItems: inventoryItemsRouter
});
 
export type AppRouter = typeof appRouter;