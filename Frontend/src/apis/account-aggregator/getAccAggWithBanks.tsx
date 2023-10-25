import { Api } from '../apiConfig';

const getAccAggWithBanks = async () => {
  try {
    const response = await Api.get('/aggregators-banks');
    const data = response.data;
    //console.log(data);
    return data;
  } catch (error) {
    //console.log(error);
    throw error;
  }
};

export default getAccAggWithBanks;
