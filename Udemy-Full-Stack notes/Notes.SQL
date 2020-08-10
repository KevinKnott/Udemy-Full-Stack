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
SELECT * FROM demo;

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

