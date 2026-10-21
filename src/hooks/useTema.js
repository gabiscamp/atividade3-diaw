import { useEffect } from "react";
import usePersistentState from "./usePersistentState";

const prefereEscuro = () => window.matchMedia?.("(prefers-color-scheme: dark)").matches;


export default function useTema() {
  const [tema, setTema] = usePersistentState("pokedex:tema", prefereEscuro() ? "escuro" : "claro");

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
  }, [tema]);

  const alternarTema = () => setTema((atual) => (atual === "escuro" ? "claro" : "escuro"));

  return { tema, alternarTema };
}
