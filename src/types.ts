import {
  HassEntities,
  HassConfig,
  Auth,
  Connection,
  MessageBase,
  HassServices
} from "home-assistant-js-websocket";

export interface AftershipCardConfig {
  type: string;
  entity: string;
  title?: string;
}

export interface Tracking {
  name: string;
  tracking_number: string;
  slug: string;
  link: string;
  last_update: string;
  expected_delivery: string;
  status: string;
  last_checkpoint: Checkpoint;
}

export interface Checkpoint {
  created_at: string;
  slug: string;
  checkpoint_time: string;
  location: string;
  city: string;
  state: string;
  country_iso3: string;
  country_name: string;
  message: string;
  tag: string;
  subtag: string;
  subtag_message: string;
  zip: string;
}

declare global {
  // for fire event
  interface HASSDomEvents {
    "hass-more-info": {
      entityId: string | null;
    };
    "config-changed": {
      config: AftershipCardConfig;
    };
    "ll-rebuild": {};
    undefined;
  }
}

export type ValidHassDomEvent = keyof HASSDomEvents;

export type LocalizeFunc = (key: string, ...args: any[]) => string;

export interface Credential {
  auth_provider_type: string;
  auth_provider_id: string;
}

export interface MFAModule {
  id: string;
  name: string;
  enabled: boolean;
}

export interface CurrentUser {
  id: string;
  is_owner: boolean;
  name: string;
  credentials: Credential[];
  mfa_modules: MFAModule[];
}

export interface Theme {
  // Incomplete
  "primary-color": string;
  "text-primary-color": string;
  "accent-color": string;
}

export interface Themes {
  default_theme: string;
  themes: { [key: string]: Theme };
}

export interface Panel {
  component_name: string;
  config: { [key: string]: any } | null;
  icon: string | null;
  title: string | null;
  url_path: string;
}

export interface Panels {
  [name: string]: Panel;
}

export interface Resources {
  [language: string]: { [key: string]: string };
}

export interface Translation {
  nativeName: string;
  isRTL: boolean;
  fingerprints: { [fragment: string]: string };
}

export interface HomeAssistant {
  auth: Auth;
  connection: Connection;
  connected: boolean;
  states: HassEntities;
  services: HassServices;
  config: HassConfig;
  themes: Themes;
  selectedTheme?: string | null;
  panels: Panels;
  panelUrl: string;

  // i18n
  // current effective language, in that order:
  //   - backend saved user selected lanugage
  //   - language in local appstorage
  //   - browser language
  //   - english (en)
  language: string;
  // local stored language, keep that name for backward compability
  selectedLanguage: string;
  resources: Resources;
  localize: LocalizeFunc;
  translationMetadata: {
    fragments: string[];
    translations: {
      [lang: string]: Translation;
    };
  };

  dockedSidebar: boolean;
  moreInfoEntityId: string;
  user: CurrentUser;
  callService: (
    domain: string,
    service: string,
    serviceData?: { [key: string]: any }
  ) => Promise<void>;
  callApi: <T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    parameters?: { [key: string]: any }
  ) => Promise<T>;
  fetchWithAuth: (
    path: string,
    init?: { [key: string]: any }
  ) => Promise<Response>;
  sendWS: (msg: MessageBase) => Promise<void>;
  callWS: <T>(msg: MessageBase) => Promise<T>;
}
