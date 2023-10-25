import { AggregatorBank, TenantAggregator } from '@/types/typestsc';
import { Button, Card, Checkbox, Col, Row, Select, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getAccAggWithBanks from '../apis/account-aggregator/getAccAggWithBanks';
import { Api } from '../apis/apiConfig';
import getTenants from '../apis/tenants/getTenants';

const { Option } = Select;

const AddAggregatorInTenants: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [tntData, setTntData] = useState<TenantAggregator[]>([]);
  const [accAggBankData, setaccAggBankData] = useState<AggregatorBank[]>([]);
  const [selectedAggregators, setSelectedAggregators] = useState<{
    [key: number]: number;
  }>({});
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getTenants(), getAccAggWithBanks()]) // Use Promise.all to load both data concurrently
      .then(([tenantsData, aggBankData]) => {
        setTntData(tenantsData);
        setaccAggBankData(aggBankData);
        setLoading(false); // Set loading to false when both data are loaded
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Step 1: Group data by aggregator name
  const groupedData: { [key: string]: AggregatorBank[] } = {};
  accAggBankData.forEach((item) => {
    const aggregatorName = item.accountAggregator.name;
    if (!groupedData[aggregatorName]) {
      groupedData[aggregatorName] = [];
    }
    groupedData[aggregatorName].push(item);
  });

  // Step 2: Create a dropdown for each unique aggregator name for each tenant
  const handleDropdownChange = (value: number, tenantId: number) => {
    setSelectedAggregators((prevState) => ({
      ...prevState,
      [tenantId]: value,
    }));
  };

  // Step 3: Handle checkbox changes
  const handleCheckboxChange = (value: string[]) => {
    setSelectedBanks(value);
  };

  // Step 4: Handle button click and send POST request
  const handleButtonClick = (tenantId: number) => {
    const aggregatorName = selectedAggregators[tenantId] || '';
    const postData = {
      name: aggregatorName,
      selectedBanks: selectedBanks, // Send bank names instead of IDs
    };

    // Find the tenant with the given tenantId
    const tenant = tntData.find((tenant) => tenant.tenantId === tenantId);

    if (tenant) {
      const tenantName = tenant.tenantName;

      // Construct the URL with the tenantName
      const url = `../view-tenant/${tenantName}`;

      // Construct the URL with the tenantId
      const apiUrl = `/tenants-aggregators/${tenantId}`;

      console.log(postData);

      // Send a POST request to your backend API
      Api.post(apiUrl, postData)
        .then(() => {
          // Handle success, e.g., show a success message
          navigate(url);
          message.success('Added successfully', 2);
        })
        .catch((error) => {
          // Handle error, e.g., show an error message
          console.error('Error sending POST request', error);
          message.error('Not added', 2);
        });
    }
  };

  return (
    <Spin spinning={loading} size="large">
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        {tntData.map((tenant) => (
          <Col key={tenant.tenantId} xs={24} sm={12} md={8} lg={6}>
            <Card title={tenant.tenantName} style={{ marginBottom: 20 }}>
              <Select
                placeholder="Select an aggregator"
                value={selectedAggregators[tenant.tenantId] || undefined}
                style={{ width: '100%' }}
                onChange={(value) => handleDropdownChange(value, tenant.tenantId)}
              >
                {Object.keys(groupedData).map((aggregatorName) => (
                  <Option key={aggregatorName} value={aggregatorName}>
                    {aggregatorName}
                  </Option>
                ))}
              </Select>
              <div style={{ marginTop: 10 }}>
                {selectedAggregators[tenant.tenantId] &&
                  groupedData[selectedAggregators[tenant.tenantId]].map((bank) => (
                    <Checkbox
                      key={bank.bank.bankId}
                      checked={selectedBanks.includes(bank.bank.bankName)} // Check by bank name
                      onChange={() => {
                        const bankName = bank.bank.bankName;
                        if (selectedBanks.includes(bankName)) {
                          // Uncheck the checkbox and remove the bank from selectedBanks
                          handleCheckboxChange(selectedBanks.filter((name) => name !== bankName));
                        } else {
                          // Check the checkbox and add the bank to selectedBanks
                          handleCheckboxChange([...selectedBanks, bankName]);
                        }
                      }}
                    >
                      {bank.bank.bankName}
                    </Checkbox>
                  ))}
              </div>
              <div style={{ textAlign: 'center' }}>
                <Button
                  type="primary"
                  onClick={() => handleButtonClick(tenant.tenantId)}
                  style={{ marginTop: 10, width: '8rem' }}
                  shape="round"
                >
                  Add
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Spin>
  );
};

export default AddAggregatorInTenants;
