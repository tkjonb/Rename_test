import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, StarHalf, ArrowLeft, ShieldCheck } from 'lucide-react';
import productsData from '../data/products.json';
import { AppContext } from '../context/AppContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const product = productsData.find(p => p.id === id);

  if (!product) {
    return <div className="product-not-found">Produto não encontrado.</div>;
  }

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => {
      addToCart(product);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="product-details-page animate-fade-in">
      <div className="container">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Voltar
        </button>

        <div className="product-layout">
          <div className="product-gallery">
            <div className="main-image-wrapper">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          <div className="product-info-column">
            <span className="product-category">{product.category}</span>
            <h1 className="product-title">{product.name}</h1>
            
            <div className="reviews-summary">
              <div className="stars">
                <Star size={16} fill="#CC00F0" color="#CC00F0" />
                <Star size={16} fill="#CC00F0" color="#CC00F0" />
                <Star size={16} fill="#CC00F0" color="#CC00F0" />
                <Star size={16} fill="#CC00F0" color="#CC00F0" />
                <StarHalf size={16} fill="#CC00F0" color="#CC00F0" />
              </div>
              <span>(128 Avaliações)</span>
            </div>

            <p className="product-stock-alert">
              {product.stock < 20 ? `Restam apenas ${product.stock} unidades!` : 'Em estoque'}
            </p>

            <div className="price-box">
              <div className="price-main">R$ {product.price.toFixed(2).replace('.', ',')}</div>
              <div className="price-installments">
                em até 12x de R$ {product.installmentPrice.toFixed(2).replace('.', ',')}
              </div>
            </div>

            <div className="action-box">
              <button 
                className="btn-primary btn-large w-full" 
                onClick={handleAddToCart}
                disabled={loading}
              >
                <ShoppingCart size={20} />
                {loading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
              </button>
            </div>

            <div className="guarantees">
              <div className="guarantee-item">
                <ShieldCheck size={20} color="#10b981" />
                <span>Entrega Imediata Garantida</span>
              </div>
              <div className="guarantee-item">
                <ShieldCheck size={20} color="#10b981" />
                <span>Compra 100% Segura e Blindada</span>
              </div>
            </div>

            <div className="description-section">
              <h3>Descrição</h3>
              <p>Receba seu <strong>{product.name}</strong> imediatamente após a confirmação do pagamento. Enviamos instruções fáceis para resgatar o seu item direto no jogo.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
