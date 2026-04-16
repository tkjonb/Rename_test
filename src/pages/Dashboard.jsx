import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Package, LogOut } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const mockOrders = [
    { id: '#10293', date: 'Hoje', status: 'Entregue', total: 'R$ 62,00', item: 'Godly ╺╸Alienbeam' },
    { id: '#09823', date: 'Semana passada', status: 'Entregue', total: 'R$ 27,90', item: '400 Robux' },
  ];

  if (!user) return null;

  return (
    <div className="dashboard-page animate-fade-in">
      <div className="container dashboard-layout">
        <aside className="dashboard-sidebar">
          <div className="user-profile-summary">
            <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          
          <nav className="dashboard-nav">
            <button className="active"><Package size={18} /> Meus Pedidos</button>
            <button onClick={handleLogout} className="logout-btn"><LogOut size={18} /> Sair</button>
          </nav>
        </aside>

        <div className="dashboard-content">
          <h2>Meus Pedidos</h2>
          
          <div className="orders-list">
            {mockOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <span className="order-id">{order.id}</span>
                  <span className="order-date">{order.date}</span>
                </div>
                <div className="order-body">
                  <div className="order-info">
                    <h4>{order.item}</h4>
                    <p>Total: {order.total}</p>
                  </div>
                  <div className="order-status completed">
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="empty-state" style={{marginTop: '2rem'}}>
            <p style={{color: 'var(--text-muted)'}}>Isso é tudo! Você não tem mais pedidos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
