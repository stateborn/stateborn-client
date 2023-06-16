import { getDaoFromStorage, setDaoInStorage } from 'src/api/services/local-storage-service';
import { api } from 'boot/axios';
import { Dao } from 'src/api/model/dao';

export const getDao = async (daoIpfsHash: string): Promise<Dao> => {
  const dao: Dao | undefined = await getDaoFromStorage(daoIpfsHash);
  if (dao === undefined) {
    const res = await api.get(`/api/rest/v1/dao/${daoIpfsHash}`);
    const newDao = new Dao(
      res.data.clientDao.name,
      res.data.clientDao.description,
      res.data.clientDao.imageBase64,
      res.data.clientDao.owners,
      res.data.clientDao.ownersMultisigThreshold,
      res.data.clientDao.proposalTokenRequiredQuantity,
      res.data.clientDao.token.name,
      res.data.clientDao.token.symbol,
      res.data.clientDao.token.network,
      res.data.clientDao.token.address,
      res.data.clientDao.token.type,
      res.data.ipfsHash
    );
    await setDaoInStorage(daoIpfsHash, newDao);
    return newDao;
  } else {
    return dao;
  }
}
