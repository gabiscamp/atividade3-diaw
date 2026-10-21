import PokemonCard from "../PokemonCard/PokemonCard";
import "./PokemonList.css";

/** Grade de cards. Cada item da lista vira um <PokemonCard /> via map(). */
function PokemonList({ pokemons, favoritos, comparar, onAbrir, onFavoritar, onComparar }) {
  return (
    <div className="pokemon-list">
      {pokemons.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          favorito={favoritos.includes(p.id)}
          comparando={comparar.includes(p.id)}
          onAbrir={onAbrir}
          onFavoritar={onFavoritar}
          onComparar={onComparar}
        />
      ))}
    </div>
  );
}

export default PokemonList;
