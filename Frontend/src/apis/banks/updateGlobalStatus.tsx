import { Api } from '../apiConfig';

interface UpdateGlobalStatusProps {
  aggId: number;
  bankId: number;
  status: boolean;
}

const updateGlobalStatus = async (postData: UpdateGlobalStatusProps) => {
  try {
    const response = await Api.put('/global-status', postData);
    const data = response.data;
    console.log(data);
    // return data;
  } catch (error) {
    console.log(error);
    // throw error;
  }
};

export default updateGlobalStatus;
