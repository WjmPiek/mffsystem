CREATE TABLE IF NOT EXISTS franchises (
    id SERIAL PRIMARY KEY,
    franchise_name VARCHAR(255) NOT NULL,
    ta_name VARCHAR(255),
    franchise_code VARCHAR(50) UNIQUE NOT NULL,
    owner_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    office_address TEXT
);
