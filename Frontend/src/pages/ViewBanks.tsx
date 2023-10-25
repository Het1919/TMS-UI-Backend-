import getBanks from '@/apis/banks/getBanks';
import { Bank } from '@/types/typestsc';
import { Spin, Table } from 'antd';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './ViewBanks.css';

const ViewBanks = () => {
  const [bankData, setBankData] = useState<Bank[]>([]);

  // const navigate = useNavigate();

  useEffect(() => {
    getBanks()
      .then((response) => {
        // console.log(response);
        setBankData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bankData]);

  // Define columns for the table
  const columns = [
    {
      title: 'Bank ID',
      dataIndex: 'bankId',
      key: 'bankId',
    },
    {
      title: 'Bank Name',
      dataIndex: 'bankName',
      key: 'bankName',
    },
  ];

  if (bankData.length === 0) {
    return <Spin size="large" />;
  } else {
    return (
      <div className="view-banks-container">
        <Table
          columns={columns}
          dataSource={bankData}
          pagination={{
            pageSize: 8,
          }}
          className="custom-table"
        />

        {/* <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Button
            type="primary"
            shape="round"
            style={{ width: '8rem' }}
            // onClick={() => {
            //   navigate('/bank/create-bank');
            // }}
          >
            Add Bank
          </Button>
        </div> */}
      </div>
    );
  }
};

export default ViewBanks;
