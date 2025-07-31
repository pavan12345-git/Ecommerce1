-- Basic product info
SELECT id, name, retail_price FROM products LIMIT 10;

-- Products by category
SELECT category, COUNT(*) as count 
FROM products 
GROUP BY category 
ORDER BY count DESC;

-- Expensive products in Clothing
SELECT name, retail_price 
FROM products 
WHERE category = 'Clothing' AND retail_price > 100
ORDER BY retail_price DESC;

-- Get 10 products with department names
SELECT p.id, p.name, p.price, d.name as department
FROM products p
LEFT JOIN departments d ON p.department_id = d.id
LIMIT 10;