
import { PilhaEstticaConfig } from "./types/pilha-estatica/config";
import { PilhaDinmicaConfig } from "./types/pilha-dinamica/config";

export const PilhaRegistry = {
  'pilha-estatica': PilhaEstticaConfig,
  'pilha-dinamica': PilhaDinmicaConfig,
};

export const PilhaOptions = Object.values(PilhaRegistry).map((item) => ({
  id: item.id,
  name: item.name,
  disabled: item.disabled,
}));
