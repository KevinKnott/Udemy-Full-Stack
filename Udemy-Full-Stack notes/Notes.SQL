-- Notes for SQL
-- Demo https://sqliteonline.com/#fiddle-5bbdbaef7288bo2ajn2wly03
-- The most common operations 

-- Create 
    -- Common data types:
        -- CHAR
        -- VARCAR (alphanumeric and special)
        -- BLOB (Binary Large Objects)
        -- ENUMs
        -- TEXT
        -- MONEY
        -- SMALLMONEY
        -- etc
-- Read
-- Update
-- Destroy


-- To create a table it is a simple as using the keyword create table tableName (data, datatype,etc)
-- A table needs to have a uniquely identifier normally called the Primary Key
CREATE TABLE products (
  id Int NOT NULL,
  -- PRIMARY KEY MOST HAVE VALUE 
  name STRING,
  price MONEY,
  PRIMARY KEY (id),
  )
  
-- Insert values using INSERT INTO 
-- You can specify where to insert into 
-- ie if you want to add value identifier after products for id, name and price (you can add only pieces with this too)
insert into products 
values (1, "Pen", 1.20);

insert into products (id, name)
values (2, "Pencil");

-- To read a table you normally use Select
SELECT * FROM "products";
SELECT name, price FROM "products";

-- To get only one value you add a where to specify a restriction
-- You can add many different criteria ie <> not equal or > < etc etc
SELECT name, price FROM "products"
WHERE id=1;

-- How to update records 
UPDATE "products"
SET price = .8
WHERE name="Pencil";

-- To change table you could alter tables
ALTER TABLE "products"
ADD stock INT;


UPDATE "products"
SET stock = 32
WHERE name="Pen";

UPDATE "products"
SET stock = 12
WHERE name = "Pencil";

-- To Destroy an object
DELETE FROM "products"
WHERE id = 2;


-- Adding Tables with foreign key ( Links two separate tables together)
CREATE TABLE orders (
  	id INT NOT NULL,
  	order_number INT,
  	customer_id INT,
  	product_id INT,
  	PRIMARY KEY (id), 
    FOREIGN KEY (customer_id) REFERENCES customers(id), -- You use the customer id to index the customer table primary key id
  	FOREIGN KEY (product_id) REFERENCES customers(id)
  )

INSERT INTO "orders"
VALUES (1, 4632, 2, 1); 

INSERT INTO "orders"
VALUES (2, 3254, 1, 1); 

-- Now for the weird stuff AKA inner joins
-- Select the fields we want to display, what table it is from and join 
SELECT orders.order_number, customers.first_name, customers.last_name, customers.address
from orders
INNER JOIN customers on orders.customer_id = customers.id
-- The join is joining customers table to orders table on the orders.customer_id 
-- to the customers table based on id

-- Adding the item they are buying as well
SELECT orders.order_number, customers.first_name, customers.last_name, customers.address, products.name, products.price
from orders
INNER JOIN customers on orders.customer_id = customers.id
INNER JOIN products on orders.product_id = products.id;