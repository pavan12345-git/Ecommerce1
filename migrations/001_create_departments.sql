-- Begin transaction for safety
BEGIN TRANSACTION;

-- 1. Create departments table
CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 2. Insert unique departments from products
INSERT INTO departments (name)
SELECT DISTINCT department FROM products
WHERE department IS NOT NULL;

-- 3. Add department_id column to products
ALTER TABLE products ADD COLUMN department_id INTEGER;

-- 4. Set foreign key relationships
UPDATE products
SET department_id = (
    SELECT id FROM departments WHERE name = products.department
)
WHERE department IS NOT NULL;

-- 5. (Optional) Create index for better performance
CREATE INDEX idx_products_department_id ON products(department_id);

COMMIT;