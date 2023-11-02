/** Types generated for queries found in "src/inventory-items/inventory-items.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'FindAllInventoryItems' parameters type */
export type IFindAllInventoryItemsParams = void;

/** 'FindAllInventoryItems' return type */
export interface IFindAllInventoryItemsResult {
  created_at: Date | null;
  description: string | null;
  id: number;
  name: string | null;
  quantity: number | null;
  serial: string | null;
}

/** 'FindAllInventoryItems' query type */
export interface IFindAllInventoryItemsQuery {
  params: IFindAllInventoryItemsParams;
  result: IFindAllInventoryItemsResult;
}

const findAllInventoryItemsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM inventory_items"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM inventory_items
 * ```
 */
export const findAllInventoryItems = new PreparedQuery<IFindAllInventoryItemsParams,IFindAllInventoryItemsResult>(findAllInventoryItemsIR);


/** 'InsertInventoryItem' parameters type */
export interface IInsertInventoryItemParams {
  item: {
    serial: string | null | void,
    name: string | null | void,
    description: string | null | void,
    quantity: number | null | void
  };
}

/** 'InsertInventoryItem' return type */
export interface IInsertInventoryItemResult {
  created_at: Date | null;
  id: number;
}

/** 'InsertInventoryItem' query type */
export interface IInsertInventoryItemQuery {
  params: IInsertInventoryItemParams;
  result: IInsertInventoryItemResult;
}

const insertInventoryItemIR: any = {"usedParamSet":{"item":true},"params":[{"name":"item","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"serial","required":false},{"name":"name","required":false},{"name":"description","required":false},{"name":"quantity","required":false}]},"locs":[{"a":73,"b":77}]}],"statement":"INSERT INTO inventory_items (serial, name, description, quantity)\nVALUES :item\nRETURNING id, created_at"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO inventory_items (serial, name, description, quantity)
 * VALUES :item
 * RETURNING id, created_at
 * ```
 */
export const insertInventoryItem = new PreparedQuery<IInsertInventoryItemParams,IInsertInventoryItemResult>(insertInventoryItemIR);


/** 'UpdateInventoryItem' parameters type */
export interface IUpdateInventoryItemParams {
  description?: string | null | void;
  id?: number | null | void;
  name?: string | null | void;
  quantity?: number | null | void;
  serial?: string | null | void;
}

/** 'UpdateInventoryItem' return type */
export type IUpdateInventoryItemResult = void;

/** 'UpdateInventoryItem' query type */
export interface IUpdateInventoryItemQuery {
  params: IUpdateInventoryItemParams;
  result: IUpdateInventoryItemResult;
}

const updateInventoryItemIR: any = {"usedParamSet":{"name":true,"serial":true,"description":true,"quantity":true,"id":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":34,"b":38}]},{"name":"serial","required":false,"transform":{"type":"scalar"},"locs":[{"a":54,"b":60}]},{"name":"description","required":false,"transform":{"type":"scalar"},"locs":[{"a":81,"b":92}]},{"name":"quantity","required":false,"transform":{"type":"scalar"},"locs":[{"a":110,"b":118}]},{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":131,"b":133}]}],"statement":"UPDATE inventory_items\nSET name = :name,\n    serial = :serial,\n    description = :description,\n    quantity = :quantity\nWHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE inventory_items
 * SET name = :name,
 *     serial = :serial,
 *     description = :description,
 *     quantity = :quantity
 * WHERE id = :id
 * ```
 */
export const updateInventoryItem = new PreparedQuery<IUpdateInventoryItemParams,IUpdateInventoryItemResult>(updateInventoryItemIR);


/** 'DeleteInventoryItem' parameters type */
export interface IDeleteInventoryItemParams {
  id?: number | null | void;
}

/** 'DeleteInventoryItem' return type */
export type IDeleteInventoryItemResult = void;

/** 'DeleteInventoryItem' query type */
export interface IDeleteInventoryItemQuery {
  params: IDeleteInventoryItemParams;
  result: IDeleteInventoryItemResult;
}

const deleteInventoryItemIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":39,"b":41}]}],"statement":"DELETE from inventory_items\nWHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE from inventory_items
 * WHERE id = :id
 * ```
 */
export const deleteInventoryItem = new PreparedQuery<IDeleteInventoryItemParams,IDeleteInventoryItemResult>(deleteInventoryItemIR);


