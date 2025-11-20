import { ComponentType } from 'react';

export interface ListComponentMap {
  theory: ComponentType;
  visualization: ComponentType;
  activity: ComponentType;
  challenge: ComponentType;
}

export interface ListConfig {
  id: string;
  name: string;
  components: ListComponentMap;
  disabled: boolean;
}

import { ldseConfig } from "./types/ldse/config";
import { lddeConfig } from "./types/ldde/config";
import { lcConfig } from "./types/lc/config";
import { leeConfig } from "./types/lee/config";
import { lesConfig } from "./types/les/config";

export const listRegistry = {
  ldse: ldseConfig,
  ldde: lddeConfig,
  lc: lcConfig,
  lee: leeConfig,
  les: lesConfig,
};

export const listOptions = Object.values(listRegistry).map((list) => ({
  id: list.id,
  name: list.name,
  disabled: list.disabled,
}));