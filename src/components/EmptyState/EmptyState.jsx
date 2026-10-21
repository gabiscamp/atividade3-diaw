import "./EmptyState.css";


function EmptyState({ titulo, texto, acao, onAcao }) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-pokeball" aria-hidden="true" />
      <h2>{titulo}</h2>
      <p>{texto}</p>
      {acao && (
        <button type="button" className="botao botao-primario" onClick={onAcao}>
          {acao}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
