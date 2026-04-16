import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './Auth.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { setUser, addToast } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      addToast('Preencha os campos obrigatórios.', 'error');
      return;
    }

    // Fake Login/Register logic
    const mockUser = {
      id: 'USR-' + Math.floor(Math.random() * 10000),
      name: isLogin ? 'Usuário Teste' : formData.name || 'Novo Usuário',
      email: formData.email,
      isAdmin: formData.email.includes('admin') // simple logic to access admin panel
    };
    
    setUser(mockUser);
    addToast(isLogin ? 'Login realizado com sucesso!' : 'Conta criada com sucesso!', 'success');
    navigate('/dashboard');
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-card">
        <h2>{isLogin ? 'Bem-vindo de volta!' : 'Criar Conta'}</h2>
        <p className="auth-subtitle">
          {isLogin ? 'Faça login para acessar suas compras.' : 'Junte-se à maior loja de produtos digitais.'}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Nome Completo</label>
              <input 
                type="text" 
                placeholder="Seu nome"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              required
              placeholder="seu@email.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" className="btn-primary w-full btn-large">
            {isLogin ? 'Entrar' : 'Registrar'}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {isLogin ? "Não tem uma conta? " : "Já possui conta? "}
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Cadastre-se' : 'Faça login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
