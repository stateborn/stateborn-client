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
  window.open(`https://stateborn.org/api/v0/cat?arg=${ipfsHash}`, '_blank');
};

export const goToEtherscan = (address: string) => {
  window.open(`https://etherscan.io/address/${address}`, '_blank');
};

