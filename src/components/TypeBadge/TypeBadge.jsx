import { CORES_TIPOS } from "../../services/pokedexService";
import "./TypeBadge.css";

/** Selo colorido com o nome do tipo. */
function TypeBadge({ tipo }) {
  return (
    <span className="type-badge" style={{ "--cor-tipo": CORES_TIPOS[tipo] }}>
      {tipo}
    </span>
  );
}

export default TypeBadge;
