import { AddBank } from '@/types/typestsc';
import { Api } from '../apiConfig';

const addBanks = async (postData: AddBank) => {
  try {
    const response = await Api.post('/banks', postData);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default addBanks;
