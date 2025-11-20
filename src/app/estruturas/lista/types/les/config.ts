import { ListConfig } from "../../config";
import Activity from "./activity";
import Challenge from "./challenge";
import Theory from "./theory";
import Visualization from "./visualization";

export const lesConfig: ListConfig = {
  id: "les",
  name: "Lista Estática Sequencial",
  components: {
    theory: Theory,
    visualization: Visualization,
    activity: Activity,
    challenge: Challenge,
  },
  disabled: false,
};
