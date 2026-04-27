import { useState, useCallback } from 'react';
import { useFinanceiro } from './js/hooks/useFinanceiro.js';
import Header from './js/components/Header.jsx';
import Cards from './js/components/Cards.jsx';
import Tabela from './js/components/Tabela.jsx';
import Modal from './js/components/Modal.jsx';
import Toast from './js/components/Toast.jsx';
import Dashboard from './js/components/Dashboard.jsx';
import './styles/dashboard.css';

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('dashboard');
  const [toasts, setToasts] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [registroEdicao, setRegistroEdicao] = useState(null);

  const adicionarToast = useCallback((tipo, titulo, mensagem) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, tipo, titulo, mensagem }]);
  }, []);

  const removerToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const { registros, loading, entradas, saidas, saldo, salvar, excluir } = useFinanceiro(adicionarToast);

  const handleNovo = () => {
    setRegistroEdicao(null);
    setModalAberto(true);
  };

  const handleEditar = (id) => {
    const registro = registros.find(r => r.id === id);
    if (registro) {
      setRegistroEdicao(registro);
      setModalAberto(true);
    }
  };

  const handleExcluir = (id) => {
    if (confirm('Tem certeza que deseja excluir este lançamento?')) {
      excluir(id);
    }
  };

  const handleSalvar = async (id, body) => {
    const sucesso = await salvar(id, body);
    if (sucesso) {
      setModalAberto(false);
      setRegistroEdicao(null);
    }
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setRegistroEdicao(null);
  };

  return (
    <div className="container">
      <Header />
      <Cards entradas={entradas} saidas={saidas} saldo={saldo} />

      {/* Navegao por Abas */}
      <div className="tabs-nav">
        <button
          className={`tab-btn ${abaAtiva === 'dashboard' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={`tab-btn ${abaAtiva === 'lancamentos' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('lancamentos')}
        >
          📋 Lanamentos
        </button>
      </div>

      {abaAtiva === 'dashboard' && (
        <Dashboard
          registros={registros}
          entradas={entradas}
          saidas={saidas}
          saldo={saldo}
        />
      )}

      {abaAtiva === 'lancamentos' && (
        <div className="main-content">
          <div className="toolbar">
            <h2>📋 Lanamentos</h2>
            <button className="btn btn-primary" onClick={handleNovo}>
              <span>+</span> Novo Lanamento
            </button>
          </div>
          <Tabela
            registros={registros}
            loading={loading}
            onEditar={handleEditar}
            onExcluir={handleExcluir}
          />
        </div>
      )}

      <Modal
        aberto={modalAberto}
        registro={registroEdicao}
        onFechar={handleFecharModal}
        onSalvar={handleSalvar}
      />

      <Toast toasts={toasts} onRemove={removerToast} />
    </div>
  );
}

