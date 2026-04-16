import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="nav-logo">
            <span className="logo-text">LIBERTY<span className="logo-accent">STORE</span></span>
          </Link>
          <p className="footer-desc">
            A maior loja de produtos digitais. Compre Robux, itens de MM2 com segurança e entrega imediata.
          </p>
        </div>
        
        <div className="footer-links-group">
          <h4>Navegação</h4>
          <Link to="/">Início</Link>
          <Link to="/products">Produtos</Link>
          <Link to="/cart">Carrinho</Link>
        </div>
        
        <div className="footer-links-group">
          <h4>Legal</h4>
          <Link to="#">Termos de Serviço</Link>
          <Link to="#">Política de Privacidade</Link>
          <Link to="#">Reembolsos</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Liberty Store. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
