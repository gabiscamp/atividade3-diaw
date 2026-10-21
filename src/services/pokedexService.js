import dados from "../data/pokedex-data.json";

/**
 * Regras da Pokédex: leitura, busca, filtro e ordenação dos dados do
 * pokedex-data.json. Nenhum componente acessa o JSON diretamente.
 */

export const CORES_TIPOS = {
  Normal: "#9a9a7a",
  Fire: "#f0702a",
  Water: "#3f8ef0",
  Grass: "#4cae4a",
  Electric: "#f2c20f",
  Ice: "#6fd0d0",
  Fighting: "#c0302a",
  Poison: "#a040a0",
  Ground: "#c9a455",
  Flying: "#8e9ff0",
  Psychic: "#f0558a",
  Bug: "#9fb21e",
  Rock: "#a98f2a",
  Ghost: "#6a4f9a",
  Dark: "#6a5546",
  Dragon: "#6a3ff0",
  Steel: "#8e8eab",
  Typeless: "#7a7a8a",
};


export const ATRIBUTOS = [
  { chave: "hp", rotulo: "HP", sigla: "HP" },
  { chave: "attack", rotulo: "Attack", sigla: "ATK" },
  { chave: "defense", rotulo: "Defense", sigla: "DEF" },
  { chave: "specialAttack", rotulo: "Sp. Attack", sigla: "SpA" },
  { chave: "specialDefense", rotulo: "Sp. Defense", sigla: "SpD" },
  { chave: "speed", rotulo: "Speed", sigla: "SPD" },
];


export const OPCOES_ORDENACAO = [
  { valor: "id", rotulo: "Número" },
  { valor: "name", rotulo: "Nome (A-Z)" },
  { valor: "total", rotulo: "Total de atributos" },
  ...ATRIBUTOS.map((a) => ({ valor: a.chave, rotulo: a.rotulo })),
];

const STAT_MAXIMO = 200;


const normalizar = (texto) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();


export const totalAtributos = (pokemon) =>
  ATRIBUTOS.reduce((soma, a) => soma + pokemon.stats[a.chave], 0);


export const percentual = (valor, maximo = STAT_MAXIMO) =>
  Math.min(100, Math.round((valor / maximo) * 100));


export const formatarId = (id) => `#${String(id).padStart(3, "0")}`;
export const tipoPrincipal = (pokemon) => pokemon.types[0]?.name ?? "Typeless";


export const urlImagem = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const listarPokemon = () => dados.pokemon;

export const buscarPorId = (id) => dados.pokemon.find((p) => p.id === id) ?? null;

export function listarTipos() {
  const usados = new Set(dados.pokemon.flatMap((p) => p.types.map((t) => t.name)));
  return dados.types.filter((t) => usados.has(t.name)).map((t) => t.name);
}


export function filtrar(busca = "", tipo = "", idsPermitidos = null) {
  const termo = normalizar(busca).replace(/^#/, "");
  const numerico = /^\d+$/.test(termo);
  const semZeros = termo.replace(/^0+/, "");

  return dados.pokemon.filter((p) => {
    if (idsPermitidos && !idsPermitidos.includes(p.id)) return false;
    if (tipo && !p.types.some((t) => t.name === tipo)) return false;
    if (!termo) return true;
    if (numerico) return String(p.id).startsWith(semZeros || "0");
    return normalizar(p.name).includes(termo);
  });
}

export function ordenar(lista, criterio = "id") {
  const copia = [...lista];
  if (criterio === "id") return copia.sort((a, b) => a.id - b.id);
  if (criterio === "name") return copia.sort((a, b) => a.name.localeCompare(b.name));
  if (criterio === "total") return copia.sort((a, b) => totalAtributos(b) - totalAtributos(a));
  return copia.sort((a, b) => b.stats[criterio] - a.stats[criterio] || a.id - b.id);
}

export const sortearPokemon = () =>
  dados.pokemon[Math.floor(Math.random() * dados.pokemon.length)];

export function listarTreinadores() {
  return dados.trainers.map((t) => ({
    ...t,
    pokemon: t.pokemonIds.map(buscarPorId).filter(Boolean),
  }));
}

export function treinadoresDoPokemon(id) {
  return dados.trainers.filter((t) => t.pokemonIds.includes(id)).map((t) => t.name);
}
