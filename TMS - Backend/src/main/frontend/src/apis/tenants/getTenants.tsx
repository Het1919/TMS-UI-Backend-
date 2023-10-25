import { Api } from '../apiConfig';

const getTenants = async () => {
  try {
    const response = await Api.get('/tenants');
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getTenants;
