const express = require('express');
const axios = require('axios');
const router = express.Router();

// Endpoint para la lista de productos
router.get('/products', async (req, res) => {
  try {
    const response = await axios.get('https://offcorss.myvtex.com/api/catalog_system/pub/products/search');
    
    let filteredProducts = response.data;
    
    // Filtrado por texto
    const search = req.query.search?.toLowerCase() || '';
    if (search) {
      filteredProducts = filteredProducts.filter(product => 
        product.productName?.toLowerCase().includes(search) || 
        product.brand?.toLowerCase().includes(search) ||
        product.description?.toLowerCase().includes(search)
      );
    }
    
    // Ordenamiento de los productos
    const sort = req.query.sort || 'name';
    const order = req.query.order || 'asc';
    
    filteredProducts.sort((a, b) => {
      let valueA, valueB;
      
      if (sort === 'name') {
        valueA = a.productName || '';
        valueB = b.productName || '';
      } else if (sort === 'price') {
        valueA = a.items?.[0]?.sellers?.[0]?.commertialOffer?.Price || 0;
        valueB = b.items?.[0]?.sellers?.[0]?.commertialOffer?.Price || 0;
      } else if (sort === 'brand') {
        valueA = a.brand || '';
        valueB = b.brand || '';
      }
      
      if (order === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    
    // Paginación
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    res.setHeader('x-total-count', filteredProducts.length);
    res.status(200).json(paginatedProducts);
    
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ message: 'Error al obtener los productos', error: error.toString() });
  }
});

// Endpoint para el detalle de producto
router.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const response = await axios.get(`https://offcorss.myvtex.com/api/catalog_system/pub/products/search/?fq=productId:${productId}`);
    
    if (response.data.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json(response.data[0]);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ message: 'Error al obtener el producto', error: error.toString() });
  }
});

module.exports = router;