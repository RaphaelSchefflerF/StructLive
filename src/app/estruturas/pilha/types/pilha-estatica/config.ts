import StackTheory from "./theory";

const StackVisualization = () => <div>Visualização da Pilha Estática</div>;
const StackActivity = () => <div>Atividade da Pilha Estática</div>;
const StackChallenge = () => <div>Desafio da Pilha Estática</div>;

export const staticStackConfig = {
  id: "pilha-estatica",
  name: "Pilha Estática",
  components: {
    theory: StackTheory,
    visualization: StackVisualization,
    activity: StackActivity,
    challenge: StackChallenge,
  },
  disabled: false,
};
