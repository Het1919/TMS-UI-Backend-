import { Api } from '../apiConfig';

interface UpdateLocalStatusProps {
  tId: number;
  agId: number;
  bId: number;
  status: boolean;
}

const updateLocalStatus = async (postData: UpdateLocalStatusProps) => {
  try {
    const response = await Api.put('/local-status', postData);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default updateLocalStatus;
