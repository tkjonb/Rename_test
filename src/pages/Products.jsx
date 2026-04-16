import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const categories = ['All', 'Robux', 'Murder Mystery 2', 'BloxFruits'];

  const filteredProducts = activeCategory === 'All' 
    ? productsData 
    : productsData.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const handleFilter = (cat) => {
    setActiveCategory(cat);
    setSearchParams(cat === 'All' ? {} : { category: cat.toLowerCase() });
  };

  return (
    <div className="products-page animate-fade-in">
      <div className="container">
        <h1 className="page-title">Catálogo Completo</h1>
        
        <div className="filters-container">
          {categories.map(cat => (
             <button 
                key={cat} 
                className={`filter-btn ${activeCategory.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
                onClick={() => handleFilter(cat)}
             >
               {cat === 'All' ? 'Todos' : cat}
             </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            Nenhum produto encontrado nesta categoria no momento.
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
