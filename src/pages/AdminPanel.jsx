import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { TrendingUp, Users, DollarSign, PackagePlus } from 'lucide-react';
import './Admin.css';

const AdminPanel = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Basic protection
    if (!user || !user.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) return null;

  return (
    <div className="admin-page animate-fade-in">
      <div className="container">
        <h1 className="page-title">Painel Administrativo</h1>
        
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon" style={{background: 'rgba(204,0,240,0.1)', color: 'var(--primary)'}}>
              <DollarSign size={24} />
            </div>
            <div className="stat-info">
              <p>Vendas no Mês</p>
              <h3>R$ 14.520,90</h3>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon" style={{background: 'rgba(16,185,129,0.1)', color: '#34d399'}}>
              <TrendingUp size={24} />
            </div>
            <div className="stat-info">
              <p>Crescimento</p>
              <h3>+24.5%</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{background: 'rgba(59,130,246,0.1)', color: '#60a5fa'}}>
              <Users size={24} />
            </div>
            <div className="stat-info">
              <p>Novos Usuários</p>
              <h3>1,429</h3>
            </div>
          </div>
        </div>

        <div className="admin-grid">
          <div className="admin-card visual-chart-container">
            <h2>Visão Geral de Vendas</h2>
            <div className="fake-chart">
               {/* Pure HTML/CSS simulated bar chart */}
               <div className="bar-wrapper"><div className="bar" style={{height: '40%'}}></div><span>Seg</span></div>
               <div className="bar-wrapper"><div className="bar" style={{height: '65%'}}></div><span>Ter</span></div>
               <div className="bar-wrapper"><div className="bar" style={{height: '50%'}}></div><span>Qua</span></div>
               <div className="bar-wrapper"><div className="bar" style={{height: '80%'}}></div><span>Qui</span></div>
               <div className="bar-wrapper"><div className="bar" style={{height: '100%', background: 'var(--primary)'}}></div><span>Sex</span></div>
               <div className="bar-wrapper"><div className="bar" style={{height: '60%'}}></div><span>Sab</span></div>
               <div className="bar-wrapper"><div className="bar" style={{height: '45%'}}></div><span>Dom</span></div>
            </div>
          </div>

          <div className="admin-card">
            <h2>Adicionar Produto <span style={{fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--text-muted)'}}>(Simulação)</span></h2>
            <form className="add-product-form" onSubmit={(e) => { e.preventDefault(); alert('Produto salvo! (Simulação)'); }}>
              <div className="form-group">
                <label>Nome do Produto</label>
                <input type="text" placeholder="Ex: Godly Chroma Darkbringer" />
              </div>
              <div className="form-row">
                <div className="form-group" style={{flex: 1}}>
                  <label>Preço (R$)</label>
                  <input type="number" placeholder="0.00" />
                </div>
                <div className="form-group" style={{flex: 1}}>
                  <label>Estoque</label>
                  <input type="number" placeholder="10" />
                </div>
              </div>
              <div className="form-group">
                <label>Categoria</label>
                <select style={{width:'100%', padding:'1rem', background:'var(--bg-base)', border:'1px solid var(--border-color)', color:'white', borderRadius:'var(--radius-sm)'}}>
                  <option>Robux</option>
                  <option>Murder Mystery 2</option>
                  <option>BloxFruits</option>
                </select>
              </div>
              <button type="submit" className="btn-primary w-full">
                <PackagePlus size={18} style={{marginRight: '0.5rem', display: 'inline'}} />
                Salvar Produto
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
