import { useState } from "react";
import { ATRIBUTOS, CORES_TIPOS } from "../services/pokedexService";
import "./PokemonForm.css";

const nomes = Object.keys(CORES_TIPOS);
function PokemonForm({ pokemon, onSalvar, onFechar }) {
  const [id, setId] = useState(pokemon?.id ?? "");
  const [name, setName] = useState(pokemon?.name ?? "");
  const [stats, setStats] = useState(pokemon?.stats ?? Object.fromEntries(ATRIBUTOS.map((a) => [a.chave, 0])));
  const [tipos, setTipos] = useState(pokemon?.types.map((t) => t.name) ?? []);
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);
  async function enviar(e) {
    e.preventDefault();
    if (!tipos.length) { setErro("Selecione pelo menos um tipo."); return; }
    setSalvando(true); setErro("");
    const ids = { Typeless: 0, Normal: 1, Fire: 2, Water: 3, Grass: 4, Electric: 5, Ice: 6, Fighting: 7, Poison: 8, Ground: 9, Flying: 10, Psychic: 11, Bug: 12, Rock: 13, Ghost: 14, Dark: 15, Dragon: 16, Steel: 17 };
    try { await onSalvar({ id: Number(id), name: name.trim(), stats: Object.fromEntries(Object.entries(stats).map(([k,v]) => [k, Number(v)])), types: tipos.map((t) => ({ id: ids[t], name: t })) }, !!pokemon); }
    catch (e) { setErro(e.message); } finally { setSalvando(false); }
  }
  return <div className="modal-fundo" onClick={onFechar}><div className="modal formulario-pokemon" role="dialog" aria-modal="true" aria-labelledby="form-titulo" onClick={(e) => e.stopPropagation()}>
    <button type="button" className="modal-fechar" onClick={onFechar} aria-label="Fechar">×</button>
    <h2 id="form-titulo">{pokemon ? "Editar Pokémon" : "Cadastrar Pokémon"}</h2>
    <form onSubmit={enviar}>
      <div className="form-grade"><label>Número <input required type="number" min="1" step="1" value={id} disabled={!!pokemon} onChange={(e) => setId(e.target.value)} /></label>
      <label>Nome <input required maxLength="100" value={name} onChange={(e) => setName(e.target.value)} /></label></div>
      <fieldset><legend>Tipos (até 2)</legend><div className="form-tipos">{nomes.map((t) => <label key={t}><input type="checkbox" checked={tipos.includes(t)} disabled={!tipos.includes(t) && tipos.length >= 2} onChange={() => setTipos((atual) => atual.includes(t) ? atual.filter((x) => x !== t) : [...atual,t])} /> {t}</label>)}</div></fieldset>
      <fieldset><legend>Atributos</legend><div className="form-grade">{ATRIBUTOS.map((a) => <label key={a.chave}>{a.rotulo}<input required type="number" min="0" step="1" value={stats[a.chave]} onChange={(e) => setStats({ ...stats, [a.chave]: e.target.value })} /></label>)}</div></fieldset>
      {erro && <p role="alert">{erro}</p>}<div className="form-acoes"><button className="botao" type="button" onClick={onFechar}>Cancelar</button><button className="botao botao-primario" disabled={salvando}>{salvando ? "Salvando..." : "Salvar"}</button></div>
    </form>
  </div></div>;
}
export default PokemonForm;
