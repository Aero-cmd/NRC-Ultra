import type { NrcUltraClientConfig } from './nrcUltraModuleBridge';
import { serializeNrcUltraClientConfig, validateNrcUltraClientConfig } from './nrcUltraClientConfigStore';

export const NRC_ULTRA_CLIENT_CONFIG_FILE = 'config/nrc-ultra/client.json';

export function prepareNrcUltraClientConfig(config: NrcUltraClientConfig): { path: string; contents: string } {
  const errors = validateNrcUltraClientConfig(config);
  if (errors.length > 0) throw new Error(`Invalid NRC Ultra client config: ${errors.join(' ')}`);
  return { path: NRC_ULTRA_CLIENT_CONFIG_FILE, contents: serializeNrcUltraClientConfig(config) };
}
