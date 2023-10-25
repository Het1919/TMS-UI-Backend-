import { Api } from '../apiConfig';

const getBanks = async () => {
  try {
    const response = await Api.get('/banks');
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getBanks;
