const API_URL = 'http://localhost:3000/financeiro';

export async function fetchRegistros() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Erro ao carregar dados');
  return response.json();
}

export async function createRegistro(body) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro.erro || 'Erro ao salvar');
  }
  return response.json();
}

export async function updateRegistro(id, body) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro.erro || 'Erro ao atualizar');
  }
  return response.json();
}

export async function deleteRegistro(id) {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro.erro || 'Erro ao excluir');
  }
  return response.json();
}

