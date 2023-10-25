import { Tenant } from '../../types/typestsc';
import { Api } from '../apiConfig';

const addTenant = async (postData: Tenant) => {
  try {
    const response = await Api.post('/tenants', postData);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    // console.log("Error :: ", error);
    throw error;
  }
};

export default addTenant;
