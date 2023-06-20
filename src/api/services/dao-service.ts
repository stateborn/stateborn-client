import { getDaoFromStorage, setDaoInStorage } from 'src/api/services/local-storage-service';
import { api } from 'boot/axios';
import { DaoBackend } from 'src/api/model/dao-backend';

export const getDao = async (daoIpfsHash: string): Promise<DaoBackend> => {
  const dao: DaoBackend | undefined = await getDaoFromStorage(daoIpfsHash);
  if (dao === undefined) {
    const res = await api.get(`/api/rest/v1/dao/${daoIpfsHash}`);
    const newDao = new DaoBackend(
      res.data.clientDao,
      res.data.ipfsHash,
    );
    await setDaoInStorage(daoIpfsHash, newDao);
    return newDao;
  } else {
    return dao;
  }
}
