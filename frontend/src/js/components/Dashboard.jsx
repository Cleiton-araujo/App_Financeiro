import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import '../../styles/dashboard.css';

const COLORS = ['#43a047', '#e53935', '#667eea', '#fb8c00', '#1e88e5'];

function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

export default function Dashboard({ registros, entradas, saidas, saldo }) {
  // Dados para grfico de pizza (entradas vs sadas)
  const pizzaData = [
    { name: 'Entradas', value: entradas, color: '#43a047' },
    { name: 'Sadas', value: saidas, color: '#e53935' },
  ].filter(item => item.value > 0);

  // Dados por forma de pagamento
  const formasPagamento = registros.reduce((acc, r) => {
    const tipo = r.tipo === 'entrada' ? 'Entrada' : 'Saida';
    const chave = `${r.formaPagamento} (${tipo})`;
    acc[chave] = (acc[chave] || 0) + parseFloat(r.valor);
    return acc;
  }, {});

  const formaPagamentoData = Object.entries(formasPagamento)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Dados agrupados por ms
  const meses = {};
  const mesesNomes = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  registros.forEach(r => {
    if (!r.data) return;
    const data = new Date(r.data);
    const chave = `${mesesNomes[data.getMonth()]}/${data.getFullYear()}`;
    if (!meses[chave]) {
      meses[chave] = { mes: chave, entradas: 0, sadas: 0 };
    }
    if (r.tipo === 'entrada') {
      meses[chave].entradas += parseFloat(r.valor);
    } else {
      meses[chave].sadas += parseFloat(r.valor);
    }
  });

  const mensalData = Object.values(meses).slice(-6); // ltimo 6 meses

  // Estatsticas
  const totalLancamentos = registros.length;
  const mediaEntrada = totalLancamentos > 0 ? entradas / totalLancamentos : 0;
  const mediaSaida = totalLancamentos > 0 ? saidas / totalLancamentos : 0;
  const maiorEntrada = Math.max(...registros.filter(r => r.tipo === 'entrada').map(r => parseFloat(r.valor)), 0);
  const maiorSaida = Math.max(...registros.filter(r => r.tipo === 'saida').map(r => parseFloat(r.valor)), 0);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>📊 Dashboard de Movimentaes</h2>
      </div>

      {/* Cards de Estatsticas */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <span className="stat-label">Total de Lanamentos</span>
            <span className="stat-value">{totalLancamentos}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <span className="stat-label">Mdia por Lanamento</span>
            <span className="stat-value">{formatarMoeda((entradas + saidas) / (totalLancamentos || 1))}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🟢</div>
          <div className="stat-info">
            <span className="stat-label">Maior Entrada</span>
            <span className="stat-value positive">{formatarMoeda(maiorEntrada)}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔴</div>
          <div className="stat-info">
            <span className="stat-label">Maior Sada</span>
            <span className="stat-value negative">{formatarMoeda(maiorSaida)}</span>
          </div>
        </div>
      </div>

      {/* Grficos */}
      <div className="dashboard-charts">
        {/* Grfico de Pizza - Entradas vs Sadas */}
        <div className="chart-card">
          <h3>Distribuio Entradas vs Sadas</h3>
          {pizzaData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pizzaData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pizzaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatarMoeda(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="chart-empty">Sem dados para exibir</div>
          )}
        </div>

        {/* Grfico de Barras - Por Forma de Pagamento */}
        <div className="chart-card">
          <h3>Por Forma de Pagamento</h3>
          {formaPagamentoData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={formaPagamentoData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(v) => `R$${(v/1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="name" width={150} style={{ fontSize: '12px' }} />
                <Tooltip formatter={(value) => formatarMoeda(value)} />
                <Bar dataKey="value" fill="#667eea" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="chart-empty">Sem dados para exibir</div>
          )}
        </div>

        {/* Grfico de rea - Mensal */}
        <div className="chart-card full-width">
          <h3>Evoluo Mensal</h3>
          {mensalData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mensalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis tickFormatter={(v) => `R$${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(value) => formatarMoeda(value)} />
                <Legend />
                <Area type="monotone" dataKey="entradas" stroke="#43a047" fill="#43a047" fillOpacity={0.3} name="Entradas" />
                <Area type="monotone" dataKey="sadas" stroke="#e53935" fill="#e53935" fillOpacity={0.3} name="Sadas" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="chart-empty">Sem dados para exibir</div>
          )}
        </div>
      </div>
    </div>
  );
}

