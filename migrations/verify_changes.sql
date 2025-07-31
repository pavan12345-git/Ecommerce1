-- Check departments were created
SELECT * FROM departments LIMIT 10;

-- Check products have department_ids
SELECT COUNT(*) FROM products WHERE department_id IS NULL;

-- Sample joined data
SELECT p.id, p.name, d.name AS department 
FROM products p
LEFT JOIN departments d ON p.department_id = d.id
LIMIT 10;