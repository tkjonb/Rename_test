import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(AppContext);

  return (
    <div className="product-card animate-fade-in">
      <Link to={`/product/${product.id}`} className="card-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.stock < 10 && (
          <span className="stock-badge">Apenas {product.stock} no estoque!</span>
        )}
      </Link>
      
      <div className="card-content">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        
        <div className="price-container">
          <span className="price-total">R$ {product.price.toFixed(2).replace('.', ',')}</span>
          <span className="price-installment">
            12x de R$ {product.installmentPrice.toFixed(2).replace('.', ',')}
          </span>
        </div>

        <button 
          className="btn-add-cart" 
          onClick={() => addToCart(product)}
        >
          <ShoppingCart size={18} />
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
