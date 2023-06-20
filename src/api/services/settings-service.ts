import { Settings } from 'src/api/model/settings';

// default value defined in quasar.conf.js
const DEFAULT_IPFS_GATEWAY_ADDRESS = <string>process.env.DEFAULT_IPFS_GATEWAY;
export const saveSettingsToLocalStorage = (settings: Settings) => {
  localStorage.setItem('settings', JSON.stringify(settings));
}

export const getSettingsFromStorage = (): Settings  => {
  const settingsJson = localStorage.getItem('settings');
  if (settingsJson === null) {
    const settings = new Settings(DEFAULT_IPFS_GATEWAY_ADDRESS);
    saveSettingsToLocalStorage(settings);
    return settings;
  }
  return JSON.parse(settingsJson);
}

export const resetIpfsGatewayAddressToDefault = () => {
  const settingsJson = getSettingsFromStorage();
  settingsJson.ipfsGateway = DEFAULT_IPFS_GATEWAY_ADDRESS;
  saveSettingsToLocalStorage(settingsJson);
};
