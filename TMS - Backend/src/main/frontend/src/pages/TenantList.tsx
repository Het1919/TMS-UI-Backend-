import getTenants from '@/apis/tenants/getTenants';
import { TenantList } from '@/types/typestsc';
import { Button, Spin, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewBanks.css';

const ViewBanks = () => {
  const [tenantData, setTenantData] = useState<TenantList[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getTenants()
      .then((response) => {
        setTenantData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Define columns for the table, including the "View Tenant" button column
  const columns = [
    {
      title: 'Tenant ID',
      dataIndex: 'tenantId',
      key: 'tenantId',
    },
    {
      title: 'Tenant Name',
      dataIndex: 'tenantName',
      key: 'tenantName',
    },
    {
      title: 'Actions', // Column for actions (including the "View Tenant" button)
      key: 'actions',
      render: (record: TenantList) => (
        <Button
          type="primary"
          onClick={() => {
            navigate(`/tenant/view-tenant/${record.tenantName}`); // Replace with your desired URL
          }}
        >
          View Tenant
        </Button>
      ),
    },
  ];

  if (tenantData.length === 0) {
    return <Spin size="large" />;
  } else {
    return (
      <div className="view-banks-container">
        <Table
          columns={columns}
          dataSource={tenantData}
          pagination={{
            pageSize: 8,
          }}
          className="custom-table"
        />
      </div>
    );
  }
};

export default ViewBanks;
