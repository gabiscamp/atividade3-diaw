import { CORES_TIPOS } from "../../services/pokedexService";
import "./TypeFilter.css";

/** Botões de filtro por tipo. Clicar no tipo ativo remove o filtro. */
function TypeFilter({ tipos, selecionado, onSelecionar }) {
  return (
    <div className="type-filter" role="group" aria-label="Filtrar por tipo">
      <button
        type="button"
        className={`chip-tipo ${selecionado === "" ? "ativo" : ""}`}
        style={{ "--cor-tipo": "var(--texto)" }}
        onClick={() => onSelecionar("")}
        aria-pressed={selecionado === ""}
      >
        Todos
      </button>
      {tipos.map((tipo) => (
        <button
          key={tipo}
          type="button"
          className={`chip-tipo ${selecionado === tipo ? "ativo" : ""}`}
          style={{ "--cor-tipo": CORES_TIPOS[tipo] }}
          onClick={() => onSelecionar(selecionado === tipo ? "" : tipo)}
          aria-pressed={selecionado === tipo}
        >
          {tipo}
        </button>
      ))}
    </div>
  );
}

export default TypeFilter;
