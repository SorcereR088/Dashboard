CREATE DATABASE real_estate_db;


CREATE TABLE user_details (
 user_id SERIAL PRIMARY KEY,
 user_name VARCHAR(255),
 user_email VARCHAR(255) UNIQUE,
 user_password VARCHAR(255) );

 ALTER TABLE user_details ADD COLUMN transaction_ids INT[] DEFAULT '{}';


 CREATE TABLE property_details (
    property_id SERIAL PRIMARY KEY,
    property_name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL
);


CREATE TABLE property_images (
    image_id SERIAL PRIMARY KEY,
    property_id INT NOT NULL,
    image_url TEXT NOT NULL,
    FOREIGN KEY (property_id) REFERENCES property_details (property_id) ON DELETE CASCADE
);

CREATE TABLE hosts (
    host_id SERIAL PRIMARY KEY,
    host_name VARCHAR(255) NOT NULL,
    host_email VARCHAR(255) UNIQUE NOT NULL,
    host_password VARCHAR(255) NOT NULL
);

SELECT p.property_id, p.property_name, p.description, p.price, i.image_url
FROM property_details p 
LEFT JOIN property_images i ON p.property_id = i.property_id
WHERE p.property_id = 1;

-- Verify the properties and associated hosts
SELECT p.property_name, p.description, p.price, h.host_name
FROM property_details p
JOIN hosts h ON p.host_id = h.host_id;

-- Verify the images and the associated properties
SELECT pi.image_url, p.property_name
FROM property_images pi
JOIN property_details p ON pi.property_id = p.property_id;

SELECT u.user_name, u.user_email, t.transaction_id, t.property_id, t.amount, t.transaction_date
FROM user_details u
JOIN transactions t ON u.user_id = t.user_id
WHERE u.user_id = 1;  -- Replace with the user_id of the user you're interested in
