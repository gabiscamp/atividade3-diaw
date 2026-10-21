import { percentual } from "../../services/pokedexService";
import "./StatBar.css";

/** Linha de atributo: rótulo, valor e barra de progresso. */
function StatBar({ rotulo, valor, cor, maximo = 200, destaque = false }) {
  return (
    <div className={`stat-bar ${destaque ? "stat-bar-destaque" : ""}`}>
      <span className="stat-rotulo">{rotulo}</span>
      <span className="stat-valor">{valor}</span>
      <div
        className="stat-trilho"
        role="progressbar"
        aria-label={rotulo}
        aria-valuenow={valor}
        aria-valuemin={0}
        aria-valuemax={maximo}
      >
        <div className="stat-preenchimento" style={{ width: `${percentual(valor, maximo)}%`, background: cor }} />
      </div>
    </div>
  );
}

export default StatBar;
