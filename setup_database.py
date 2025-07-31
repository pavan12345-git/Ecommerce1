import sqlite3
import pandas as pd

def create_database():
    """Step 1: Create the database and table structure"""
    conn = sqlite3.connect('ecommerce.db')
    cursor = conn.cursor()

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        cost REAL,
        category TEXT,
        name TEXT,
        brand TEXT,
        retail_price REAL,
        department TEXT,
        sku TEXT UNIQUE,
        distribution_center_id INTEGER
    )
    ''')

    # Add indexes for better performance
    cursor.execute('''CREATE INDEX IF NOT EXISTS idx_category ON products (category)''')
    cursor.execute('''CREATE INDEX IF NOT EXISTS idx_brand ON products (brand)''')
    cursor.execute('''CREATE INDEX IF NOT EXISTS idx_department ON products (department)''')

    conn.commit()
    conn.close()
    print("✅ Database table created successfully!")

def load_csv_data():
    """Step 2: Load data from CSV into the database"""
    try:
        conn = sqlite3.connect('ecommerce.db')
        
        # Read the CSV file
        df = pd.read_csv('products.csv')
        
        # Write to SQLite database
        df.to_sql('products', conn, if_exists='replace', index=False)
        
        conn.close()
        print("✅ CSV data loaded successfully!")
    except Exception as e:
        print(f"❌ Error loading CSV data: {e}")

def verify_data():
    """Step 3: Verify the loaded data"""
    conn = sqlite3.connect('ecommerce.db')
    cursor = conn.cursor()
    
    # Count total products
    cursor.execute("SELECT COUNT(*) FROM products")
    count = cursor.fetchone()[0]
    print(f"\n📊 Total products loaded: {count}")
    
    # Show sample data
    print("\n🔍 Sample products (first 5 entries):")
    cursor.execute("SELECT id, name, brand, retail_price FROM products LIMIT 5")
    for row in cursor.fetchall():
        print(f"ID: {row[0]} | {row[1]} ({row[2]}) | Price: ${row[3]:.2f}")
    
    conn.close()

# Execute all steps
if __name__ == "__main__":
    create_database()
    load_csv_data()
    verify_data()