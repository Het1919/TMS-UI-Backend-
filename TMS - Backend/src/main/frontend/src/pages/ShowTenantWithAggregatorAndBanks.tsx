import { TenantBankData } from '@/types/typestsc';
import { Card, Col, Row, Spin, Switch, message } from 'antd';
import React, { useEffect, useState } from 'react';
import updateLocalStatus from '../apis/banks/updateLocalStatus';
import getTenantsWithAggregatorAndBanks from '../apis/tenants/getTenantsWithAggregatorAndBanks';

const ShowTenantWithAggregatorAndBanks: React.FC = () => {
  const [tenantBankData, setTenantBankData] = useState<TenantBankData[]>([]);

  useEffect(() => {
    getTenantsWithAggregatorAndBanks()
      .then((data) => {
        setTenantBankData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSwitchChange = (tenantId: number, id: number, bankId: number, newStatus: boolean) => {
    const postData = {
      tId: tenantId,
      agId: id,
      bId: bankId,
      status: newStatus,
    };

    // Call the updateStatus API function here with the necessary parameters
    updateLocalStatus(postData)
      .then(() => {
        // Handle the response, e.g., show a success message
        //console.log('Status updated successfully');
        message.success('Local-Status updated successfully', 2);

        // Update the local state to reflect the new status
        const updatedTenantBankData = tenantBankData.map((item) => {
          if (
            item.tenant.tenantId === tenantId &&
            item.accountAggregator.id === id &&
            item.bank.bankId === bankId
          ) {
            return { ...item, status: newStatus };
          }
          return item;
        });

        setTenantBankData(updatedTenantBankData); // Update the state
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error('Error updating status:', error);
        message.error('Failed to update status', 2);
      });
  };

  // Group data by tenant name
  const groupedData: {
    [tenantName: string]: {
      [aggregatorName: string]: TenantBankData[];
    };
  } = {};
  tenantBankData.forEach((item) => {
    const tenantName = item.tenant.tenantName;
    const aggregatorName = item.accountAggregator.name;

    if (!groupedData[tenantName]) {
      groupedData[tenantName] = {};
    }

    if (!groupedData[tenantName][aggregatorName]) {
      groupedData[tenantName][aggregatorName] = [];
    }

    groupedData[tenantName][aggregatorName].push(item);
  });

  if (tenantBankData.length === 0) {
    return <Spin size="large" />;
  } else {
    return (
      <div>
        {Object.entries(groupedData).map(([tenantName, tenantData]) => (
          <Row key={tenantName} gutter={[16, 16]} style={{ marginTop: '1rem' }}>
            <Col span={24}>
              <Card title={tenantName} style={{ textAlign: 'center' }}>
                <Row gutter={[16, 16]}>
                  {Object.entries(tenantData).map(([aggregatorName, aggregatorData], index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={6}>
                      <Card
                        key={aggregatorName}
                        title={aggregatorName}
                        style={{ marginBottom: 16, textAlign: 'center' }}
                      >
                        <Row key={aggregatorName} gutter={16}>
                          {aggregatorData.map((item) => (
                            <Col span={24} key={item.bank.bankId}>
                              <Card
                                className="horizontal-card"
                                style={{
                                  // border: '2px solid',
                                  display: 'flex',
                                  justifyContent: 'space-around',
                                  alignItems: 'center',
                                  width: '100%',
                                }}
                              >
                                <span style={{ marginRight: '2rem' }}>{item.bank.bankName}</span>
                                <Switch
                                  checked={item.status}
                                  onChange={(checked) => {
                                    handleSwitchChange(
                                      item.tenant.tenantId,
                                      item.accountAggregator.id,
                                      item.bank.bankId,
                                      checked,
                                    );
                                  }}
                                />
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>
        ))}
      </div>
    );
  }
};

export default ShowTenantWithAggregatorAndBanks;
