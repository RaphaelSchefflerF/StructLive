import { ListConfig } from "../../config";
import Activity from "./activity";
import Challenge from "./challenge";
import Theory from "./theory";
import Visualization from "./visualization";

export const leeConfig: ListConfig = {
  id: "lee",
  name: "Lista Estática Encadeada",
  components: {
    theory: Theory,
    visualization: Visualization,
    activity: Activity,
    challenge: Challenge,
  },
  disabled: false,
};
