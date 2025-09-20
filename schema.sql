-- Create Database bookShop if not exists
CREATE DATABASE IF NOT EXISTS bookShop;
-- Use Database bookShop
USE bookShop;

-- Create Table books if not exists
create table books
(
    id          int auto_increment comment 'Primary Key'
        primary key,
    title       varchar(50)  not null comment 'Book Title',
    description varchar(255) not null comment 'Contains Book Description',
    cover       longtext     null,
    price       float        not null
)
    comment 'Book Table';


-- Insert Data into books table
INSERT INTO books (title, description, cover, price) VALUES
('The Great Gatsby', 'A novel by F. Scott Fitzgerald','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_IMgommhG3FCuyNE04bm3yy6V6EIYiOBRwd_WnQrQTa3KROcHZ20lit22vMsUgu6mLIREqW0gzQfaGj4Esjgoq2ArPZcfxyYPPINM35Sg' , 10.99),
('To Kill a Mockingbird', 'A novel by Harper Lee', NULL, 8.99),
('1984', 'A novel by George Orwell', NULL, 9.99);
