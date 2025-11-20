import { ListConfig } from "../../config";
import Activity from "./activity";
import Challenge from "./challenge";
import Theory from "./theory";
import Visualization from "./visualization";

export const lddeConfig: ListConfig = {
  id: "ldde",
  name: "Lista Dinâmica Duplamente Encadeada",
  components: {
    theory: Theory,
    visualization: Visualization,
    activity: Activity,
    challenge: Challenge,
  },
  disabled: false,
};
