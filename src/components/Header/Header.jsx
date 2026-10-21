import "./Header.css";

const ABAS = [
  { id: "pokedex", rotulo: "Pokédex" },
  { id: "treinadores", rotulo: "Treinadores" },
];

/** Topo da aplicação: lente da Pokédex, título, abas e botão de tema. */
function Header({ aba, onTrocarAba, tema, onAlternarTema, total }) {
  return (
    <header className="header">
      <div className="header-linha">
        <div className="lente" aria-hidden="true">
          <span className="lente-vidro" />
        </div>
        <div className="leds" aria-hidden="true">
          <i style={{ background: "#ff5a5a" }} />
          <i style={{ background: "#f5c518" }} />
          <i style={{ background: "#4cd964" }} />
        </div>

        <div className="header-titulo">
          <h1>Pokédex</h1>
          <p>{total} registros da região de Kanto</p>
        </div>

        <button
          type="button"
          className="tema-botao"
          onClick={onAlternarTema}
          aria-label={tema === "escuro" ? "Ativar tema claro" : "Ativar tema escuro"}
          title={tema === "escuro" ? "Tema claro" : "Tema escuro"}
        >
          {tema === "escuro" ? "☀" : "☾"}
        </button>
      </div>

      <nav className="abas" aria-label="Seções">
        {ABAS.map((a) => (
          <button
            key={a.id}
            type="button"
            className={`aba ${aba === a.id ? "ativa" : ""}`}
            aria-current={aba === a.id ? "page" : undefined}
            onClick={() => onTrocarAba(a.id)}
          >
            {a.rotulo}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Header;
