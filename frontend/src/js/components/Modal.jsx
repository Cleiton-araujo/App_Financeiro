import { useEffect, useState } from 'react';
import '../../styles/modal.css';

const FORMAS_PAGAMENTO = [
  'Dinheiro',
  'PIX',
  'Cartão de Crédito',
  'Cartão de Débito',
  'Boleto',
  'Transferência'
];

export default function Modal({ aberto, registro, onFechar, onSalvar }) {
  const [form, setForm] = useState({
    data: '',
    tipo: 'entrada',
    descricao: '',
    formaPagamento: 'Dinheiro',
    valor: ''
  });

  useEffect(() => {
    if (registro) {
      setForm({
        data: registro.data ? registro.data.split('T')[0] : '',
        tipo: registro.tipo,
        descricao: registro.descricao,
        formaPagamento: registro.formaPagamento,
        valor: registro.valor
      });
    } else {
      setForm({
        data: new Date().toISOString().split('T')[0],
        tipo: 'entrada',
        descricao: '',
        formaPagamento: 'Dinheiro',
        valor: ''
      });
    }
  }, [registro, aberto]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    const { data, descricao, formaPagamento, valor, tipo } = form;
    const valorNum = parseFloat(valor);

    if (!data || !descricao || !formaPagamento || isNaN(valorNum) || valorNum <= 0) {
      alert('Preencha todos os campos corretamente');
      return;
    }

    onSalvar(registro?.id || null, { data, descricao, formaPagamento, valor: valorNum, tipo });
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onFechar();
    }
  };

  return (
    <div className={`modal-overlay ${aberto ? 'active' : ''}`} onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h3>{registro ? 'Editar Lançamento' : 'Novo Lançamento'}</h3>
          <button className="btn-close" onClick={onFechar}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="data">Data</label>
              <input
                type="date"
                id="data"
                className="form-control"
                value={form.data}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="tipo">Tipo</label>
              <select
                id="tipo"
                className="form-control"
                value={form.tipo}
                onChange={handleChange}
                required
              >
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <input
              type="text"
              id="descricao"
              className="form-control"
              placeholder="Ex: Pagamento de cliente"
              value={form.descricao}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="formaPagamento">Forma de Pagamento</label>
              <select
                id="formaPagamento"
                className="form-control"
                value={form.formaPagamento}
                onChange={handleChange}
                required
              >
                {FORMAS_PAGAMENTO.map(fp => (
                  <option key={fp} value={fp}>{fp}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="valor">Valor (R$)</label>
              <input
                type="number"
                id="valor"
                className="form-control"
                step="0.01"
                placeholder="0,00"
                value={form.valor}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onFechar}>Cancelar</button>
          <button className="btn btn-success" onClick={handleSubmit}>Salvar</button>
        </div>
      </div>
    </div>
  );
}

