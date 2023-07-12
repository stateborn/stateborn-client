import { getSettingsFromStorage } from 'src/api/services/settings-service';

export const getTimeCounterColorDependingOTimeLeft = (days: number, hours: number) => {
  if (days > 0) {
    return '';
  } else {
    if (hours < 1) {
      return 'text-red';
    } else  {
      return 'text-orange-10';
    }
  }
}

export const goToIpfs = (ipfsHash: string) => {
  const settings = getSettingsFromStorage();
  window.open(`${settings.ipfsGateway}/cat?arg=${ipfsHash}`, '_blank');
};

export const goToEtherscan = (address: string, chainId: string) => {
  switch (chainId) {
    case '1':
      window.open(`https://etherscan.io/address/${address}`, '_blank');
      break;
    case '42161':
      window.open(`https://arbiscan.io/address/${address}`, '_blank');
      break;
    case '137':
      window.open(`https://polygonscan.com/address/${address}`, '_blank');
      break;
    default:
      window.open(`https://etherscan.io/address/${address}`, '_blank');
      break;
  }
};

