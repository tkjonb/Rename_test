import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Trash2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(AppContext);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal * (1 - discount);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'LIBERTY10') {
      setDiscount(0.1);
    } else if (couponCode.toUpperCase() === 'ROBUX20') {
      setDiscount(0.2);
    } else {
      setDiscount(0);
      alert('Cupom Inválido');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart animate-fade-in">
        <h2>Seu carrinho está vazio 😔</h2>
        <p>Volte à loja e encontre os melhores itens!</p>
        <Link to="/products" className="btn-primary" style={{marginTop: '2rem', display: 'inline-block'}}>
          Continuar Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page animate-fade-in">
      <div className="container">
        <h1>Seu Carrinho</h1>
        
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-img" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-category">{item.category}</p>
                </div>
                <div className="cart-item-price">
                  R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                </div>
                <div className="cart-item-qty">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Resumo da Compra</h3>
            
            <div className="coupon-box">
              <input 
                type="text" 
                placeholder="Cupom de Desconto" 
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
              />
              <button onClick={applyCoupon}>Aplicar</button>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            {discount > 0 && (
              <div className="summary-row discount">
                <span>Desconto ({(discount * 100).toFixed(0)}%)</span>
                <span>- R$ {(subtotal * discount).toFixed(2).replace('.', ',')}</span>
              </div>
            )}
            
            <div className="summary-row total">
              <span>Total</span>
              <span>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>

            <button 
              className="btn-primary w-full btn-checkout"
              onClick={() => navigate('/checkout')}
            >
              Ir para Pagamento <ArrowRight size={18} />
            </button>
            
            <p className="summary-note">Dica: Use cupom <strong>LIBERTY10</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
