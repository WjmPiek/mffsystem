CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    franchise_id INTEGER NOT NULL REFERENCES franchises(id),
    employee_type VARCHAR(50) NOT NULL,
    security_role VARCHAR(50) NOT NULL,
    title VARCHAR(50),
    full_name VARCHAR(255) NOT NULL,
    id_number VARCHAR(50),
    email VARCHAR(255),
    phone VARCHAR(50),
    login_username VARCHAR(100),
    login_password_hash VARCHAR(255),
    date_employed DATE,
    branch VARCHAR(100),
    vendors_id VARCHAR(100),
    pin_code VARCHAR(50),
    status VARCHAR(20) DEFAULT 'Active',
    notes TEXT
);
