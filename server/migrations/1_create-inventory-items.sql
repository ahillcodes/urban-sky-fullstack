CREATE TABLE inventory_items (
    id serial PRIMARY KEY,
    serial text,
    name text,
    description text,
    quantity integer,
    created_at timestamp default current_timestamp
);