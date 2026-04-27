import '../../styles/tabela.css';

export default function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">📭</div>
      <h3>Nenhum lançamento encontrado</h3>
      <p>Clique em "Novo Lançamento" para começar</p>
    </div>
  );
}

