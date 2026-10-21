import "./SearchBar.css";

/** Campo de busca por nome ou número. Atualiza a lista a cada tecla digitada. */
function SearchBar({ valor, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="busca" className="visualmente-oculto">
        Pesquisar Pokémon por nome ou número
      </label>
      <input
        id="busca"
        type="search"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Pesquisar Pokémon... (nome ou número)"
        autoComplete="off"
      />
    </div>
  );
}

export default SearchBar;
