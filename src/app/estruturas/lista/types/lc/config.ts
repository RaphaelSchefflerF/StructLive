import { ListConfig } from "../../config";
import Activity from "./activity";
import Challenge from "./challenge";
import Theory from "./theory";
import Visualization from "./visualization";

export const lcConfig: ListConfig = {
  id: "lc",
  name: "Lista Circular",
  components: {
    theory: Theory,
    visualization: Visualization,
    activity: Activity,
    challenge: Challenge,
  },
  disabled: false,
};
