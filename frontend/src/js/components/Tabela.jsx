import '../../styles/tabela.css';
import EmptyState from './EmptyState.jsx';

function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

function formatarData(dataString) {
  if (!dataString) return '-';
  const data = new Date(dataString);
  return data.toLocaleDateString('pt-BR');
}

export default function Tabela({ registros, loading, onEditar, onExcluir }) {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (registros.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Forma de Pagamento</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {registros.map(r => (
            <tr key={r.id}>
              <td>{formatarData(r.data)}</td>
              <td>{r.descricao}</td>
              <td>{r.formaPagamento}</td>
              <td>
                <span className={`badge badge-${r.tipo}`}>
                  {r.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                </span>
              </td>
              <td className={`valor-${r.tipo}`}>{formatarMoeda(r.valor)}</td>
              <td>
                <div className="actions">
                  <button
                    className="btn-icon btn-edit"
                    onClick={() => onEditar(r.id)}
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-icon btn-delete"
                    onClick={() => onExcluir(r.id)}
                    title="Excluir"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

