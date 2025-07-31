import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container, Grid, Typography, Button,
  Box, Chip, Rating, Divider, Alert,
  IconButton, Paper
} from '@mui/material';
import { ShoppingCart, Favorite, ArrowBack } from '@mui/icons-material';
import axios from 'axios';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  if (loading) return (
    <Container>Loading...</Container>
  );

  if (error) return (
    <Container>
      <Alert severity="error">Error loading product: {error}</Alert>
    </Container>
  );

  if (!product) return (
    <Container>
      <Alert severity="warning">Product not found</Alert>
    </Container>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        href="/"
        sx={{ mb: 2 }}
      >
        Back to Products
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{ 
                width: '100%',
                maxHeight: '500px',
                objectFit: 'contain'
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            
            <Box display="flex" alignItems="center" mb={2}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" ml={1}>
                ({product.reviews} reviews)
              </Typography>
            </Box>

            <Typography variant="h5" color="primary" mb={2}>
              ${product.price.toFixed(2)}
              {product.originalPrice && (
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  component="span" 
                  ml={1}
                  sx={{ textDecoration: 'line-through' }}
                >
                  ${product.originalPrice.toFixed(2)}
                </Typography>
              )}
            </Typography>

            {product.discount && (
              <Chip 
                label={`${product.discount}% OFF`} 
                color="error" 
                size="small"
                sx={{ mb: 2 }}
              />
            )}

            <Typography variant="body1" paragraph>
              {product.description || 'No description available.'}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" alignItems="center" gap={2}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
              >
                Add to Cart
              </Button>
              <IconButton aria-label="add to favorites">
                <Favorite />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}