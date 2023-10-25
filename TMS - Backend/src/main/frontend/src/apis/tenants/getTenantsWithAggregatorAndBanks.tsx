import { Api } from '../apiConfig';

const getTenantsWithAggregatorAndBanks = async () => {
  try {
    const response = await Api.get('/tenants-aggregators-banks');
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getTenantsWithAggregatorAndBanks;
