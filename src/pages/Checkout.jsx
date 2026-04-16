import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { CheckCircle, Loader2 } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const { cart, clearCart, addToast, user } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0 && !success) {
      navigate('/cart');
    }
    if (!user) {
      addToast('Você precisa estar logado para finalizar a compra.', 'error');
      navigate('/login');
    }
  }, [cart, success, navigate, user, addToast]);

  const handleCheckout = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to payment gateway
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      clearCart();
    }, 2500);
  };

  if (success) {
    return (
      <div className="checkout-success animate-slide-up">
        <CheckCircle size={80} color="#10b981" />
        <h1>Pagamento Aprovado!</h1>
        <p>Seu pedido foi processado com sucesso e os itens serão entregues em instantes.</p>
        <button className="btn-primary" onClick={() => navigate('/dashboard')}>
          Ver Meus Pedidos
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page animate-fade-in">
      <div className="container checkout-layout">
        <div className="checkout-form-container">
          <h2>Pagamento Seguro</h2>
          <form className="checkout-form" onSubmit={handleCheckout}>
            <div className="form-group">
              <label>Pix (Chave Simulação)</label>
              <div className="pix-box">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo%E2%80%94pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.svg" alt="Pix" style={{height: '30px', filter: 'invert(1)'}}/>
                <p>O QR Code será gerado após clicar em Finalizar Compra.</p>
              </div>
            </div>

            <div className="form-group">
              <label>Nome Completo</label>
              <input type="text" required defaultValue={user?.name || ''} placeholder="Seu nome" />
            </div>

            <div className="form-group">
              <label>Email para recebimento</label>
              <input type="email" required defaultValue={user?.email || ''} placeholder="seu@email.com" />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full btn-large mt-4">
              {loading ? <><Loader2 className="spinner" /> Processando...</> : 'Finalizar Compra'}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h3>Resumo da Compra</h3>
          <div className="checkout-items">
            {cart.map(item => (
              <div key={item.id} className="checkout-item-row">
                <span>{item.quantity}x {item.name}</span>
                <span>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
              </div>
            ))}
          </div>
          <div className="checkout-total">
            <span>Total a pagar:</span>
            <span>R$ {cart.reduce((a, b) => a + (b.price * b.quantity), 0).toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
