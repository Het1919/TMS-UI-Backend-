import { Col, Row, Switch, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import updateGlobalStatus from '../../apis/banks/updateGlobalStatus';
import { AggregatorBankData } from '../../types/typestsc';

import { ProCard } from '@ant-design/pro-card';
import './AggregatorCard.css';

interface AggregatorCardProps {
  aggregatorData: AggregatorBankData[];
}

const AggregatorCard: React.FC<AggregatorCardProps> = ({ aggregatorData }) => {
  const [groupedData, setGroupedData] = useState<Record<string, AggregatorBankData[]>>({});

  useEffect(() => {
    const processedData: Record<string, AggregatorBankData[]> = {};
    aggregatorData.forEach((agg) => {
      const aggregatorName = agg.accountAggregator.name;
      if (!processedData[aggregatorName]) {
        processedData[aggregatorName] = [];
      }
      processedData[aggregatorName].push(agg);
    });
    setGroupedData(processedData);
  }, [aggregatorData]);

  const handleSwitchChange = (
    aggId: number,
    bankId: number,
    globalStatus: boolean,
    aggregatorName: string,
  ) => {
    const postData = {
      bankId: bankId,
      aggId: aggId,
      status: globalStatus,
    };

    updateGlobalStatus(postData)
      .then(() => {
        // Update the UI by modifying the globalStatus property in the state
        setGroupedData((prevData) => {
          const updatedData = { ...prevData };
          updatedData[aggregatorName].forEach((bank) => {
            if (bank.bank.bankId === bankId) {
              bank.globalStatus = globalStatus;
            }
          });
          return updatedData;
        });
        message.success('Global status updated', 2);
      })
      .catch((error) => {
        console.log(error);
        message.error('failed from update', 2);
      });
  };

  return (
    <Row gutter={[16, 16]} justify="center">
      {Object.entries(groupedData).map(([aggregatorName, banks]) => (
        <Col key={aggregatorName} xl={5} lg={6} md={8} sm={12} xs={24} className="agg-card-col">
          <ProCard
            className="agg-card"
            title={aggregatorName}
            style={{
              // border: '2px solid',
              width: '100%',
              textAlign: 'center',
              height: '55vh',
              padding: '.1rem',
              boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
            }}
            bordered
          >
            <div
              style={{
                // border: '2px solid',
                textAlign: 'center',
                height: '45vh',
                overflowY: 'auto',
                overflowX: 'hidden',
              }}
            >
              <Row gutter={[16, 16]} style={{ marginInline: 'auto' }}>
                {banks.map((bank) => (
                  <Col key={bank.bank.bankId} style={{ width: '100%' }}>
                    <ProCard
                      className="agg-info"
                      style={{
                        // border: '2px solid red',
                        width: '100%',
                        paddingInline: '0px',
                        marginInline: 'auto',
                      }}
                    >
                      <div
                        style={{
                          // border: '2px solid blue',
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        {/* <img
                          src={
                            bank.bank.bankId === 1
                              ? SBI
                              : bank.bank.bankId === 2
                              ? HDFC
                              : bank.bank.bankId === 3
                              ? BOB
                              : bank.bank.bankId === 4
                              ? ICICI
                              : PNB
                          }
                          alt={bank.bank.bankName}
                          style={{
                            width: '30px',
                            height: '30px',
                            marginRight: '10px', // Add margin for spacing
                          }}
                        /> */}
                        <Typography.Title
                          level={5}
                          style={{
                            // whiteSpace: 'nowrap',
                            // flex: '1',
                            // background: 'lightblue',
                            display: 'flex',
                            alignItems: 'center',
                            marginBlock: 'auto',
                          }}
                        >
                          {bank.bank.bankName}
                        </Typography.Title>
                        <Switch
                          checked={bank.globalStatus}
                          style={{ marginLeft: '15px' }}
                          onChange={(checked) =>
                            handleSwitchChange(
                              bank.accountAggregator.id,
                              bank.bank.bankId,
                              checked,
                              aggregatorName,
                            )
                          }
                        />
                      </div>
                    </ProCard>
                  </Col>
                ))}
              </Row>
            </div>
          </ProCard>
        </Col>
      ))}
    </Row>
  );
};

export default AggregatorCard;
