import { useMemo, useState } from "react";
import { CORES_TIPOS, formatarId, listarTreinadores, tipoPrincipal, urlImagem } from "../../services/pokedexService";
import EmptyState from "../EmptyState/EmptyState";
import "./TrainerList.css";

/** Área de treinadores: nome, insígnias e os Pokémon de cada um. */
function TrainerList({ onAbrirPokemon, dadosTreinadores, pokemons }) {
  const [busca, setBusca] = useState("");
  const treinadores = useMemo(() => listarTreinadores(dadosTreinadores, pokemons), [dadosTreinadores, pokemons]);

  const visiveis = treinadores.filter((t) => t.name.toLowerCase().includes(busca.trim().toLowerCase()));

  return (
    <section aria-labelledby="treinadores-titulo">
      <div className="treinadores-topo">
        <h2 id="treinadores-titulo">Treinadores</h2>
        <input
          type="search"
          className="treinadores-busca"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar treinador..."
          aria-label="Buscar treinador"
        />
      </div>

      {visiveis.length === 0 ? (
        <EmptyState titulo="Nenhum treinador encontrado" texto="Confira o nome digitado e tente de novo." />
      ) : (
        <div className="treinadores-grade">
          {visiveis.map((t) => (
            <article key={t.id} className="treinador">
              <header className="treinador-cabeca">
                <h3>{t.name}</h3>
                <div className="insignias" role="img" aria-label={`${t.badges} insígnias`}>
                  <span className="insignias-pontos" aria-hidden="true">
                    {Array.from({ length: 9 }, (_, i) => (
                      <i key={i} className={i < t.badges ? "cheia" : ""} />
                    ))}
                  </span>
                  <span className="insignias-numero">{t.badges}/9</span>
                </div>
              </header>

              <ul className="treinador-time">
                {t.pokemon.map((p, i) => (
                  <li key={`${p.id}-${i}`}>
                    <button
                      type="button"
                      className="time-membro"
                      style={{ "--cor-tipo": CORES_TIPOS[tipoPrincipal(p)] }}
                      onClick={() => onAbrirPokemon(p.id)}
                      title={`Ver detalhes de ${p.name}`}
                    >
                      <img src={urlImagem(p.id)} alt="" loading="lazy" onError={(e) => (e.currentTarget.style.visibility = "hidden")} />
                      <span>{p.name}</span>
                      <small>{formatarId(p.id)}</small>
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default TrainerList;
