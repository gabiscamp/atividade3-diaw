import { useEffect, useState } from "react";
import {
  ATRIBUTOS,
  CORES_TIPOS,
  formatarId,
  tipoPrincipal,
  totalAtributos,
  treinadoresDoPokemon,
  urlImagem,
} from "../../services/pokedexService";
import StatBar from "../StatBar/StatBar";
import TypeBadge from "../TypeBadge/TypeBadge";
import "./PokemonDetails.css";

/** Modal com os detalhes de um Pokémon. Fecha com Esc, clique fora ou no botão. */
function PokemonDetails({ pokemon, favorito, comparando, onFechar, onFavoritar, onComparar, treinadoresDados, onEditar, onExcluir }) {
  const [imagemFalhou, setImagemFalhou] = useState(false);
  const cor = CORES_TIPOS[tipoPrincipal(pokemon)];
  const treinadores = treinadoresDoPokemon(treinadoresDados, pokemon.id);

  useEffect(() => {
    const aoTeclar = (e) => e.key === "Escape" && onFechar();
    document.addEventListener("keydown", aoTeclar);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = "";
    };
  }, [onFechar]);

  return (
    <div className="modal-fundo" onClick={onFechar}>
      <div
        className="modal detalhes"
        style={{ "--cor-tipo": cor }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detalhes-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-fechar" onClick={onFechar} aria-label="Fechar">
          ✕
        </button>

        <div className="detalhes-topo">
          <div className="detalhes-imagem">
            {imagemFalhou ? (
              <span className="imagem-vazia" aria-hidden="true" />
            ) : (
              <img src={urlImagem(pokemon.id)} alt={pokemon.name} onError={() => setImagemFalhou(true)} />
            )}
          </div>

          <div className="detalhes-ident">
            <span className="detalhes-numero">{formatarId(pokemon.id)}</span>
            <h2 id="detalhes-titulo">{pokemon.name}</h2>
            <div className="detalhes-tipos">
              {pokemon.types.map((t) => (
                <TypeBadge key={t.id} tipo={t.name} />
              ))}
            </div>
            <div className="detalhes-botoes">
              <button type="button" className="botao" onClick={() => onEditar(pokemon)}>Editar</button>
              <button type="button" className="botao" onClick={() => onExcluir(pokemon)}>Excluir</button>
              <button
                type="button"
                className={`botao ${favorito ? "botao-ativo" : ""}`}
                onClick={() => onFavoritar(pokemon.id)}
                aria-pressed={favorito}
              >
                {favorito ? "★ Favorito" : "☆ Favoritar"}
              </button>
              <button
                type="button"
                className={`botao ${comparando ? "botao-ativo" : ""}`}
                onClick={() => onComparar(pokemon.id)}
                aria-pressed={comparando}
              >
                {comparando ? "⇄ Na comparação" : "⇄ Comparar"}
              </button>
            </div>
          </div>
        </div>

        <div className="detalhes-stats">
          {ATRIBUTOS.map((a) => (
            <StatBar key={a.chave} rotulo={a.rotulo} valor={pokemon.stats[a.chave]} cor={cor} />
          ))}
          <p className="detalhes-total">
            Total <strong>{totalAtributos(pokemon)}</strong>
          </p>
        </div>

        {treinadores.length > 0 && (
          <p className="detalhes-treinadores">
            Treinado por: <strong>{treinadores.join(", ")}</strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default PokemonDetails;
