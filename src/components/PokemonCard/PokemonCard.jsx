import { useState } from "react";
import {
  ATRIBUTOS,
  CORES_TIPOS,
  formatarId,
  percentual,
  tipoPrincipal,
  urlImagem,
} from "../../services/pokedexService";
import TypeBadge from "../TypeBadge/TypeBadge";
import "./PokemonCard.css";

/** Card de um Pokémon: imagem, número, nome, tipos e os seis atributos. */
function PokemonCard({ pokemon, favorito, comparando, onAbrir, onFavoritar, onComparar }) {
  const [imagemFalhou, setImagemFalhou] = useState(false);
  const cor = CORES_TIPOS[tipoPrincipal(pokemon)];

  return (
    <article className="pokemon-card" style={{ "--cor-tipo": cor }}>
      <div className="card-acoes">
        <button
          type="button"
          className={`icone-botao ${favorito ? "ligado" : ""}`}
          onClick={() => onFavoritar(pokemon.id)}
          aria-pressed={favorito}
          aria-label={`${favorito ? "Remover" : "Adicionar"} ${pokemon.name} ${favorito ? "dos" : "aos"} favoritos`}
          title="Favorito"
        >
          {favorito ? "★" : "☆"}
        </button>
        <button
          type="button"
          className={`icone-botao ${comparando ? "ligado" : ""}`}
          onClick={() => onComparar(pokemon.id)}
          aria-pressed={comparando}
          aria-label={`${comparando ? "Tirar" : "Adicionar"} ${pokemon.name} ${comparando ? "da" : "à"} comparação`}
          title="Comparar"
        >
          ⇄
        </button>
      </div>

      <button type="button" className="card-principal" onClick={() => onAbrir(pokemon.id)}>
        <span className="card-numero">{formatarId(pokemon.id)}</span>

        <span className="card-imagem">
          {imagemFalhou ? (
            <span className="imagem-vazia" aria-hidden="true" />
          ) : (
            <img
              src={urlImagem(pokemon.id)}
              alt={pokemon.name}
              loading="lazy"
              onError={() => setImagemFalhou(true)}
            />
          )}
        </span>

        <span className="card-nome">{pokemon.name}</span>

        <span className="card-tipos">
          {pokemon.types.map((t) => (
            <TypeBadge key={t.id} tipo={t.name} />
          ))}
        </span>

        <span className="card-stats">
          {ATRIBUTOS.map((a) => (
            <span key={a.chave} className="mini-stat" title={a.rotulo}>
              <span className="mini-sigla">{a.sigla}</span>
              <span className="mini-valor">{pokemon.stats[a.chave]}</span>
              <span className="mini-trilho">
                <span style={{ width: `${percentual(pokemon.stats[a.chave])}%` }} />
              </span>
            </span>
          ))}
        </span>
      </button>
    </article>
  );
}

export default PokemonCard;
