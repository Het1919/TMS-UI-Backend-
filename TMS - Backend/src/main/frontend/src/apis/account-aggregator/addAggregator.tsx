import { AccAgg } from '../../types/typestsc';
import { Api } from '../apiConfig';

const addAggregator = async (postData: AccAgg) => {
  try {
    const response = await Api.post('/aggregators', postData);
    const data = response.data;
    return data;
  } catch (error) {
    // console.log("Error :: ", error);
    throw error;
  }
};

export default addAggregator;
