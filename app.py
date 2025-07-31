from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config
import os
from pathlib import Path

# Initialize Flask app first
app = Flask(__name__)

# Load configuration BEFORE creating SQLAlchemy instance
app.config.from_object(Config)

# Now initialize SQLAlchemy with the configured app
db = SQLAlchemy(app)
CORS(app)  # Enable CORS

# Database model
class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    cost = db.Column(db.Float)
    category = db.Column(db.String(100))
    name = db.Column(db.String(200))
    brand = db.Column(db.String(100))
    retail_price = db.Column(db.Float)
    department = db.Column(db.String(100))
    sku = db.Column(db.String(50), unique=True)
    distribution_center_id = db.Column(db.Integer)

# Verify database connection
def check_db_connection():
    try:
        db.engine.connect()
        db_path = app.config['SQLALCHEMY_DATABASE_URI'].replace('sqlite:///', '')
        print(f"✅ Database connected successfully at: {db_path}")
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

# API Endpoints
@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        products = Product.query.paginate(page=page, per_page=per_page)
        
        return jsonify({
            'data': [{
                'id': p.id,
                'name': p.name,
                'brand': p.brand,
                'price': p.retail_price,
                'category': p.category
            } for p in products.items],
            'meta': {
                'total': products.total,
                'pages': products.pages,
                'current_page': page,
                'per_page': per_page
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<int:id>', methods=['GET'])
def get_product(id):
    try:
        product = Product.query.get_or_404(id)
        return jsonify({
            'data': {
                'id': product.id,
                'name': product.name,
                'brand': product.brand,
                'price': product.retail_price,
                'category': product.category,
                'cost': product.cost,
                'department': product.department,
                'sku': product.sku,
                'distribution_center_id': product.distribution_center_id
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 404

if __name__ == '__main__':
    with app.app_context():
        if check_db_connection():
            db.create_all()  # Create tables if they don't exist
            app.run(debug=True, host='0.0.0.0', port=5000)