/* 
    @name FindAllInventoryItems 
*/
SELECT * FROM inventory_items;

/* 
    @name InsertInventoryItem 
    @param item -> (serial, name, description, quantity)
*/
INSERT INTO inventory_items (serial, name, description, quantity)
VALUES :item
RETURNING id, created_at;

/* 
    @name UpdateInventoryItem 
*/
UPDATE inventory_items
SET name = :name,
    serial = :serial,
    description = :description,
    quantity = :quantity
WHERE id = :id;

/* 
    @name DeleteInventoryItem 
*/
DELETE from inventory_items
WHERE id = :id;
