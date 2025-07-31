import React, { useState } from 'react';
import {
  Card, CardMedia, CardContent, CardActions,
  Typography, Button, IconButton, Rating, Box,
  Chip, Tooltip
} from '@mui/material';
// ...existing code...
import { Link } from 'react-router-dom';
import { Favorite, FavoriteBorder, ShoppingCart, Visibility } from '@mui/icons-material';
// ...existing code...

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return (
      <Card sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="body2">No product data available.</Typography>
      </Card>
    );
  }

  return (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
      }
    }}>
      {/* Product Image with Badges */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.image || '/placeholder-product.jpg'}
          alt={product.name}
          sx={{ objectFit: 'contain', p: 2, bgcolor: '#f9f9f9' }}
        />
        {product.discount && (
          <Chip
            label={`${product.discount}% OFF`}
            color="error"
            size="small"
            sx={{ position: 'absolute', top: 10, right: 10 }}
          />
        )}
      </Box>

      {/* Product Details */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" noWrap>
          {product.name}
        </Typography>
        
        <Box display="flex" alignItems="center" mb={1}>
          <Rating value={product.rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" ml={1}>
            ({product.reviews} reviews)
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            ${product.price.toFixed(2)}
          </Typography>
          {product.originalPrice && (
            <Typography variant="body2" color="text.secondary" ml={1} sx={{ textDecoration: 'line-through' }}>
              ${product.originalPrice.toFixed(2)}
            </Typography>
          )}
        </Box>
      </CardContent>

      {/* Action Buttons */}
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
          <IconButton onClick={() => setIsFavorite(!isFavorite)}>
            {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
        
        <Button
          variant="contained"
          size="small"
          startIcon={<ShoppingCart />}
          sx={{ borderRadius: '20px' }}
        >
          Add to Cart
        </Button>
        
        <Button
          component={Link}
          to={`/product/${product.id}`}
          size="small"
          startIcon={<Visibility />}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
}