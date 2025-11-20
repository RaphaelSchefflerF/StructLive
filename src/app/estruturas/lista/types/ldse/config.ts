import { ListConfig } from "../../config";
import Activity from "./activity";
import Challenge from "./challenge";
import Theory from "./theory";
import Visualization from "./visualization";

export const ldseConfig: ListConfig = {
  id: "ldse",
  name: "Lista Dinâmica Simplesmente Encadeada",
  components: {
    theory: Theory,
    visualization: Visualization,
    activity: Activity,
    challenge: Challenge,
  },
  disabled: false,
};
