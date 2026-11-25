import { useCallback, useEffect, useMemo, useState } from "react";
import CompareModal from "./components/CompareModal/CompareModal";
import EmptyState from "./components/EmptyState/EmptyState";
import Header from "./components/Header/Header";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import PokemonList from "./components/PokemonList/PokemonList";
import SearchBar from "./components/SearchBar/SearchBar";
import TrainerList from "./components/TrainerList/TrainerList";
import TypeFilter from "./components/TypeFilter/TypeFilter";
import usePersistentState from "./hooks/usePersistentState";
import useTema from "./hooks/useTema";
import {
  OPCOES_ORDENACAO,
  carregarPokemons, carregarTreinadores, salvarPokemon, excluirPokemon,
  filtrar,

  listarTipos,
  ordenar,
  sortearPokemon,
} from "./services/pokedexService";
import PokemonForm from "./components/PokemonForm";
import "./App.css";

/**
 * Tela única com duas abas (Pokédex e Treinadores).
 * Guarda os estados da aplicação e repassa por props para os componentes.
 */
function App() {
  const { tema, alternarTema } = useTema();

  const [aba, setAba] = useState("pokedex");
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState("");
  const [ordem, setOrdem] = useState("id");
  const [somenteFavoritos, setSomenteFavoritos] = useState(false);
  const [favoritos, setFavoritos] = usePersistentState("pokedex:favoritos", []);

  const [selecionadoId, setSelecionadoId] = useState(null);
  const [comparar, setComparar] = useState([]); // até 2 IDs
  const [comparando, setComparando] = useState(false);

  const [dados, setDados] = useState([]);
  const [treinadores, setTreinadores] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [formulario, setFormulario] = useState(null);
  const carregar = useCallback(async () => {
    setCarregando(true); setErro("");
    try { const [ps, ts] = await Promise.all([carregarPokemons(), carregarTreinadores()]); setDados(ps); setTreinadores(ts); }
    catch (e) { setErro(`Não foi possível carregar a Pokédex: ${e.message}`); }
    finally { setCarregando(false); }
  }, []);
  useEffect(() => { carregar(); }, [carregar]);
  const buscarPorId = (id) => dados.find((p) => p.id === id);
  const tipos = useMemo(() => listarTipos(dados), [dados]);
  const total = dados.length;
  const salvar = async (pokemon, editar) => {
    const salvo = await salvarPokemon(pokemon, editar);
    setDados((atual) => editar ? atual.map((p) => p.id === salvo.id ? salvo : p) : [...atual, salvo]);
    setFormulario(null); setSelecionadoId(null);
  };
  const excluir = async (pokemon) => {
    if (!window.confirm(`Excluir ${pokemon.name}? Esta ação não pode ser desfeita.`)) return;
    try { await excluirPokemon(pokemon.id); setDados((atual) => atual.filter((p) => p.id !== pokemon.id)); setComparar((atual) => atual.filter((id) => id !== pokemon.id)); setFavoritos((atual) => atual.filter((id) => id !== pokemon.id)); setSelecionadoId(null); }
    catch (e) { setErro(`Não foi possível excluir: ${e.message}`); }
  };

  // estado derivado: a lista exibida depende de busca, tipo, favoritos e ordem
  const pokemons = useMemo(
    () => ordenar(filtrar(dados, busca, tipo, somenteFavoritos ? favoritos : null), ordem),
    [dados, busca, tipo, somenteFavoritos, favoritos, ordem]
  );

  const temFiltro = busca !== "" || tipo !== "" || somenteFavoritos;

  const limparFiltros = () => {
    setBusca("");
    setTipo("");
    setSomenteFavoritos(false);
  };

  const alternarFavorito = useCallback(
    (id) => setFavoritos((atual) => (atual.includes(id) ? atual.filter((f) => f !== id) : [...atual, id])),
    [setFavoritos]
  );

  // Com 2 selecionados, escolher um terceiro substitui o mais antigo.
  const alternarComparacao = useCallback(
    (id) =>
      setComparar((atual) => {
        if (atual.includes(id)) return atual.filter((c) => c !== id);
        return atual.length < 2 ? [...atual, id] : [atual[1], id];
      }),
    []
  );

  const fecharDetalhes = useCallback(() => setSelecionadoId(null), []);
  const fecharComparacao = useCallback(() => setComparando(false), []);

  const abrirAleatorio = () => {
    const sorteado = sortearPokemon(dados);
    if (!sorteado) return;
    setAba("pokedex");
    setSelecionadoId(sorteado.id);
  };

  const selecionado = selecionadoId ? buscarPorId(selecionadoId) : null;
  const [compA, compB] = comparar.map(buscarPorId);

  return (
    <>
      <Header aba={aba} onTrocarAba={setAba} tema={tema} onAlternarTema={alternarTema} total={total} />

      <main className="container">
        {erro && <p role="alert" className="api-erro">{erro} <button type="button" className="botao" onClick={carregar}>Tentar novamente</button></p>}
        {carregando && <p role="status">Carregando Pokédex...</p>}
        {aba === "pokedex" ? (
          <>
            <div className="barra-ferramentas">
              <SearchBar valor={busca} onChange={setBusca} />
              <button type="button" className="botao botao-primario" onClick={() => setFormulario({})}>+ Cadastrar Pokémon</button>

              <label className="campo-ordem">
                <span>Ordenar por</span>
                <select value={ordem} onChange={(e) => setOrdem(e.target.value)}>
                  {OPCOES_ORDENACAO.map((o) => (
                    <option key={o.valor} value={o.valor}>
                      {o.rotulo}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                className={`botao ${somenteFavoritos ? "botao-ativo" : ""}`}
                onClick={() => setSomenteFavoritos((v) => !v)}
                aria-pressed={somenteFavoritos}
              >
                ★ Favoritos ({favoritos.length})
              </button>

              <button type="button" className="botao botao-primario" onClick={abrirAleatorio}>
                🎲 Aleatório
              </button>
            </div>

            <TypeFilter tipos={tipos} selecionado={tipo} onSelecionar={setTipo} />

            <p className="resultado-info" aria-live="polite">
              <strong>{pokemons.length}</strong> de {total} Pokémon
              {temFiltro && (
                <button type="button" className="link-limpar" onClick={limparFiltros}>
                  Limpar filtros
                </button>
              )}
            </p>

            {pokemons.length > 0 ? (
              <PokemonList
                pokemons={pokemons}
                favoritos={favoritos}
                comparar={comparar}
                onAbrir={setSelecionadoId}
                onFavoritar={alternarFavorito}
                onComparar={alternarComparacao}
              />
            ) : (
              <EmptyState
                titulo="Nenhum Pokémon encontrado"
                texto={
                  somenteFavoritos && favoritos.length === 0
                    ? "Você ainda não favoritou ninguém. Toque na estrela de um card para guardar o Pokémon aqui."
                    : "Nada combina com a busca e os filtros atuais. Confira o nome ou o número digitado."
                }
                acao="Limpar filtros"
                onAcao={limparFiltros}
              />
            )}
          </>
        ) : (
          <TrainerList onAbrirPokemon={setSelecionadoId} dadosTreinadores={treinadores} pokemons={dados} />
        )}
      </main>

      {comparar.length > 0 && (
        <div className="barra-comparacao" role="region" aria-label="Comparação de Pokémon">
          <span>
            {comparar.length === 1
              ? `${compA.name} selecionado. Escolha outro para comparar.`
              : `${compA.name} × ${compB.name}`}
          </span>
          <button
            type="button"
            className="botao botao-primario"
            disabled={comparar.length < 2}
            onClick={() => setComparando(true)}
          >
            Comparar
          </button>
          <button type="button" className="botao" onClick={() => setComparar([])}>
            Limpar
          </button>
        </div>
      )}

      {selecionado && (
        <PokemonDetails
          pokemon={selecionado}
          treinadoresDados={treinadores}
          onEditar={(p) => setFormulario(p)}
          onExcluir={excluir}
          favorito={favoritos.includes(selecionado.id)}
          comparando={comparar.includes(selecionado.id)}
          onFechar={fecharDetalhes}
          onFavoritar={alternarFavorito}
          onComparar={alternarComparacao}
        />
      )}

      {formulario && <PokemonForm pokemon={formulario.id ? formulario : null} onSalvar={salvar} onFechar={() => setFormulario(null)} />}

      {comparando && compA && compB && <CompareModal a={compA} b={compB} onFechar={fecharComparacao} />}
    </>
  );
}

export default App;
