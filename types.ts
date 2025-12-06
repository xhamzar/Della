export interface Player {
  uuid: string;
  name_raw: string;
  name_clean: string;
  name_html: string;
}

export interface ServerStatusResponse {
  online: boolean;
  host: string;
  port: number;
  ip_address: string;
  retrieved_at: number;
  expires_at: number;
  version?: {
    name_raw: string;
    name_clean: string;
    name_html: string;
    protocol: number;
  };
  players?: {
    online: number;
    max: number;
    list: Player[];
  };
  motd?: {
    raw: string;
    clean: string;
    html: string;
  };
  icon?: string; // Base64 image
  mods?: any[];
  software?: string;
  plugins?: any[];
  latency?: number;
}
