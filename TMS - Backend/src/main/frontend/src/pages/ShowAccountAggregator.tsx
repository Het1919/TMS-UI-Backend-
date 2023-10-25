import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import getAccAggWithBanks from '../apis/account-aggregator/getAccAggWithBanks';
import AggregatorCard from '../components/aggregator/AggregatorCard';
import { AggregatorBankData } from '../types/typestsc';

const ShowAccountAggregator = () => {
  const [aggData, setAggData] = useState<AggregatorBankData[]>([]);

  useEffect(() => {
    getAccAggWithBanks()
      .then((data) => {
        setAggData(data);
        //console.log(data);
      })
      .catch((error) => {
        console.log('Error fetching data ', error);
      });
  }, []);

  if (aggData.length === 0) {
    return (
      <Spin
        size="large"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      />
    );
  } else {
    return (
      <div>
        <AggregatorCard aggregatorData={aggData} />
      </div>
    );
  }
};

export default ShowAccountAggregator;
