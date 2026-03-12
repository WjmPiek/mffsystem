INSERT INTO roles (name) VALUES
('superuser'),
('franchisee'),
('manager'),
('agent')
ON CONFLICT (name) DO NOTHING;
