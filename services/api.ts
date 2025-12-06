import { ServerStatusResponse } from '../types';

const BASE_URL = 'https://api.mcstatus.io/v2/status/bedrock';

export const fetchServerStatus = async (ip: string, port: string): Promise<ServerStatusResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/${ip}:${port}`);
    if (!response.ok) {
      throw new Error(`Error fetching status: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch server status", error);
    // Return a default offline state if fetch fails completely
    return {
      online: false,
      host: ip,
      port: parseInt(port),
      ip_address: ip,
      retrieved_at: Date.now(),
      expires_at: 0,
    };
  }
};
