import { useState, useEffect, useCallback } from 'react';
import { fetchRegistros, createRegistro, updateRegistro, deleteRegistro } from '../api.js';

export function useFinanceiro(onToast) {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregar = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchRegistros();
      setRegistros(data);
    } catch (error) {
      onToast('error', 'Erro', error.message);
    } finally {
      setLoading(false);
    }
  }, [onToast]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const salvar = useCallback(async (id, body) => {
    try {
      if (id) {
        await updateRegistro(id, body);
        onToast('success', 'Sucesso', 'Lançamento atualizado!');
      } else {
        await createRegistro(body);
        onToast('success', 'Sucesso', 'Lançamento criado!');
      }
      await carregar();
      return true;
    } catch (error) {
      onToast('error', 'Erro', error.message);
      return false;
    }
  }, [carregar, onToast]);

  const excluir = useCallback(async (id) => {
    try {
      await deleteRegistro(id);
      onToast('success', 'Sucesso', 'Lançamento excluído!');
      await carregar();
      return true;
    } catch (error) {
      onToast('error', 'Erro', error.message);
      return false;
    }
  }, [carregar, onToast]);

  const entradas = registros
    .filter(r => r.tipo === 'entrada')
    .reduce((acc, r) => acc + parseFloat(r.valor), 0);

  const saidas = registros
    .filter(r => r.tipo === 'saida')
    .reduce((acc, r) => acc + parseFloat(r.valor), 0);

  const saldo = entradas - saidas;

  return { registros, loading, entradas, saidas, saldo, carregar, salvar, excluir };
}

