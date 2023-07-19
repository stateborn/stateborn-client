import { getDaoFromStorage, setDaoInStorage } from 'src/api/services/indexdb-service';
import { api } from 'boot/axios';
import { DaoBackend } from 'src/api/model/dao-backend';
import { ProposalVerification } from 'src/api/model/proposal-verification';
import { getIpfsJsonFile } from 'src/api/services/ipfs-service';
import { abiEncodeDao, isDaoValid } from 'src/api/services/signature-service';
import { ClientDao } from 'src/api/model/ipfs/client-dao';

export const getDao = async (daoIpfsHash: string, onValidationDoneCallback?: (daoBackend: DaoBackend) => void): Promise<DaoBackend> => {
  const daoBackend: DaoBackend = await getDaoOrFetch(daoIpfsHash);
  if (!daoBackend.daoVerification?.isVerified) {
    // async, if fails will be retried on next call
    verifyDaoWithIpfsContent(daoBackend).then(async () => {
      const backendDaoAfterValidationDone = await getDaoOrFetch(daoIpfsHash);
      if (onValidationDoneCallback) {
        onValidationDoneCallback(backendDaoAfterValidationDone);
      }
    });
  }
  return daoBackend;
}

export const getDaoOrFetch = async (daoIpfsHash: string): Promise<DaoBackend> => {
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

const verifyDaoWithIpfsContent = async (dao: DaoBackend): Promise<void> => {
  dao.daoVerification = await getDaoVerificationToSave(dao.ipfsHash, dao);
  await setDaoInStorage(dao.ipfsHash, dao);
}

const getDaoVerificationToSave = async (daoIpfsHash: string, daoBackend: DaoBackend): Promise<ProposalVerification> => {
  let daoIpfs;
  try {
    daoIpfs = await getIpfsJsonFile(daoIpfsHash);
  } catch (err) {
    const error = 'Verification with IPFS failed: IPFS connection problem occurred';
    console.log(error, err);
    return new ProposalVerification(
      false,
      false,
      error);
  }
  if (daoIpfs !== undefined) {
    const ipfsClientDao: ClientDao = daoIpfs.clientDao;
    const abiEncodedIpfsClientDao = abiEncodeDao(ipfsClientDao);
    const abiEncodedBackendClientDao = abiEncodeDao(daoBackend.clientDao);
    if (abiEncodedIpfsClientDao !== abiEncodedBackendClientDao) {
      const error = `Verification with IPFS failed: backend DAO ${daoIpfsHash} doesn't match dao saved in IPFS.`;
      console.log(error);
      return new ProposalVerification(
        true,
        false,
        error);
    } else {
      if (isDaoValid(ipfsClientDao, daoIpfs.signature)) {
        console.log(`DAO ${daoIpfsHash} is validated with IPFS document.`);
        return new ProposalVerification(
          true,
          true,
        );
      } else {
        const error = `Verification with IPFS failed: IPFS DAO signature is not valid. DAO is not signed by ${ipfsClientDao.owners[0]}`;
        console.log(error);
        return new ProposalVerification(
          true,
          false,
          error);
      }
    }
  } else {
    const error = `Verification with IPFS failed: DAO ${daoIpfsHash} is not found in IPFS.`;
    console.log(error);
    return new ProposalVerification(
      true,
      false,
      error);
  }
}
