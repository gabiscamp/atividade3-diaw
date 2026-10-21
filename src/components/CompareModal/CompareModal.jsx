import { useEffect } from "react";
import { ATRIBUTOS, CORES_TIPOS, formatarId, tipoPrincipal, totalAtributos, urlImagem } from "../../services/pokedexService";
import StatBar from "../StatBar/StatBar";
import TypeBadge from "../TypeBadge/TypeBadge";
import "./CompareModal.css";

/** Compara dois Pokémon lado a lado e destaca o maior valor de cada atributo. */
function CompareModal({ a, b, onFechar }) {
  useEffect(() => {
    const aoTeclar = (e) => e.key === "Escape" && onFechar();
    document.addEventListener("keydown", aoTeclar);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = "";
    };
  }, [onFechar]);

  const linhas = [
    ...ATRIBUTOS.map((at) => ({ rotulo: at.rotulo, va: a.stats[at.chave], vb: b.stats[at.chave] })),
    { rotulo: "Total", va: totalAtributos(a), vb: totalAtributos(b) },
  ];

  const renderColuna = (p, lado) => (
    <div key={lado} className="comparar-coluna" style={{ "--cor-tipo": CORES_TIPOS[tipoPrincipal(p)] }}>
      <img src={urlImagem(p.id)} alt={p.name} onError={(e) => (e.currentTarget.style.visibility = "hidden")} />
      <span className="comparar-numero">{formatarId(p.id)}</span>
      <h3>{p.name}</h3>
      <div className="comparar-tipos">
        {p.types.map((t) => (
          <TypeBadge key={t.id} tipo={t.name} />
        ))}
      </div>
      <div className="comparar-stats">
        {linhas.map((l) => {
          const valor = lado === "a" ? l.va : l.vb;
          const outro = lado === "a" ? l.vb : l.va;
          return (
            <StatBar
              key={l.rotulo}
              rotulo={l.rotulo}
              valor={valor}
              maximo={l.rotulo === "Total" ? 680 : 200}
              cor={CORES_TIPOS[tipoPrincipal(p)]}
              destaque={valor > outro}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="modal-fundo" onClick={onFechar}>
      <div
        className="modal comparar"
        role="dialog"
        aria-modal="true"
        aria-labelledby="comparar-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-fechar" onClick={onFechar} aria-label="Fechar">
          ✕
        </button>
        <h2 id="comparar-titulo" className="comparar-titulo">
          Comparação
        </h2>
        <div className="comparar-grade">
          {renderColuna(a, "a")}
          {renderColuna(b, "b")}
        </div>
        <p className="comparar-legenda">Os números em destaque são o maior valor de cada atributo.</p>
      </div>
    </div>
  );
}

export default CompareModal;
