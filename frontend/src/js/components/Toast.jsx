import { useEffect } from 'react';
import '../../styles/toast.css';

const icones = {
  success: '✅',
  error: '❌',
  info: 'ℹ️'
};

export default function Toast({ toasts, onRemove }) {
  useEffect(() => {
    const timers = toasts.map(t =>
      setTimeout(() => onRemove(t.id), 4000)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, onRemove]);

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.tipo}`}>
          <div className="toast-icon">{icones[t.tipo]}</div>
          <div className="toast-content">
            <div className="toast-title">{t.titulo}</div>
            <div className="toast-message">{t.mensagem}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

