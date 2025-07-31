import { Box } from "@mui/material";
import React from 'react';
import { Container, Grid } from '@mui/material';
import { ProductCard, PageHeader } from '../components';

const ProductsPage = () => {
  // Sample data - replace with your API call
  const products = [
    { id: 1, name: 'Premium Headphones', price: 199.99, image: '/assets/headphones.jpg' },
    { id: 2, name: 'Wireless Keyboard', price: 89.99, image: '/assets/keyboard.jpg' },
    // Add more products
  ];

  return (
    <Container maxWidth="lg">
      <PageHeader title="Our Products" subtitle="Browse our collection" />
      
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsPage;

