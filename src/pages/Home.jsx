import React, { useEffect, useContext } from 'react';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { AppContext } from '../context/AppContext';
import './Home.css';

const Home = () => {
  const { addToast } = useContext(AppContext);

  // Fake real-time purchases
  useEffect(() => {
    const fakeNames = ["Joaozinho", "Maria123", "GamerX", "Breno_BR", "Pedrinho"];
    const interval = setInterval(() => {
      const randomProduct = productsData[Math.floor(Math.random() * productsData.length)];
      const randomName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
      addToast(`${randomName} acabou de comprar ${randomProduct.name}!`, 'info');
    }, 12000); // Trigger a toast every 12 seconds
    
    return () => clearInterval(interval);
  }, [addToast]);

  const featuredRobux = productsData.filter(p => p.category === 'Robux' && p.featured);
  const featuredMM2 = productsData.filter(p => p.category === 'Murder Mystery 2' && p.featured);

  return (
    <div className="home-page animate-fade-in">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title animate-slide-up">
            Eleve seu jogo com a <span className="logo-accent">Liberty Store</span>
          </h1>
          <p className="hero-description animate-slide-up" style={{ animationDelay: '0.1s' }}>
            A maior loja de produtos digitais do Brasil. Compre Robux, skins de MM2, e frutas no Blox Fruits com entrega imediata e 100% segura.
          </p>
          <div className="hero-cta animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <a href="#featured" className="btn-primary">Ver Ofertas</a>
            <a href="/products" className="btn-secondary">Catálogo Completo</a>
          </div>
        </div>
      </section>

      <section id="featured" className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>🔥 Destaques de Robux</h2>
            <a href="/products?category=robux" className="view-all">Ver Todos</a>
          </div>
          <div className="products-grid">
            {featuredRobux.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>🔪 Destaques Murder Mystery 2</h2>
            <a href="/products?category=mm2" className="view-all">Ver Todos</a>
          </div>
          <div className="products-grid">
            {featuredMM2.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="features-banner">
        <div className="container features-grid">
          <div className="feature-item">
            <h3>⚡ Entrega Rápida</h3>
            <p>Seus produtos disponíveis assim que o pagamento for aprovado.</p>
          </div>
          <div className="feature-item">
            <h3>🔒 Compra Segura</h3>
            <p>Transações blindadas de ponta a ponta sem risco de banimento.</p>
          </div>
          <div className="feature-item">
            <h3>💬 Suporte 24/7</h3>
            <p>Nossa equipe está sempre pronta para ajudar você.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
