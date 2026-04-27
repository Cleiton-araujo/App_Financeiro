import '../../styles/cards.css';

function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

export default function Cards({ entradas, saidas, saldo }) {
  return (
    <div className="cards">
      <div className="card card-entradas">
        <div className="card-header">
          <span className="card-title">Total de Entradas</span>
          <div className="card-icon">📈</div>
        </div>
        <div className="card-value">{formatarMoeda(entradas)}</div>
      </div>
      <div className="card card-saidas">
        <div className="card-header">
          <span className="card-title">Total de Saídas</span>
          <div className="card-icon">📉</div>
        </div>
        <div className="card-value">{formatarMoeda(saidas)}</div>
      </div>
      <div className="card card-saldo">
        <div className="card-header">
          <span className="card-title">Saldo</span>
          <div className="card-icon">💵</div>
        </div>
        <div className="card-value">{formatarMoeda(saldo)}</div>
      </div>
    </div>
  );
}

