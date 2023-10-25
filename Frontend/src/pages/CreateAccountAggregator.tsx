import { Button, Card, Divider, Form, Input, Select, Spin, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import addAggregator from '../apis/account-aggregator/addAggregator';
import getBanks from '../apis/banks/getBanks';
import { AccAgg, Bank } from '../types/typestsc';
// import './CreateAccountAggregator.css';

const { Option } = Select;

const CreateAccountAggregator = () => {
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    aggregatorName: '',
    selectedBanks: [] as string[],
  });

  const [bankOptions, setBankOptions] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBanks()
      .then((data) => {
        const options: Bank[] = data.map((bank: Bank) => ({
          bankId: bank.bankId,
          bankName: bank.bankName,
        }));
        setBankOptions(options);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleFormSubmit = () => {
    const postData: AccAgg = {
      name: formData.aggregatorName,
      banks: formData.selectedBanks,
    };

    addAggregator(postData)
      .then(() => {
        message.success('Account Aggregator Created', 2);
        // navigate('/account-aggregator/all-account-aggregators');
      })
      .catch(() => {
        message.error('Account Aggregator already exists with this name!!');
      });
  };

  const handleBankSelectChange = (selectedBanks: string[]) => {
    setFormData({ ...formData, selectedBanks });
  };

  return (
    <div className="create-account-aggregator-container">
      {loading ? (
        <Spin size="large" />
      ) : (
        <Card className="create-account-aggregator-card">
          {/* <Typography.Title className="create-account-aggregator-title" level={4}>
            Create Account Aggregator
          </Typography.Title>
          <Divider className="create-account-aggregator-divider" /> */}
          <div className="create-account-aggregator-form-container">
            <Form onFinish={handleFormSubmit}>
              <Form.Item
                className="create-account-aggregator-form-item"
                label="AcAgg Name"
                name="aggName"
                rules={[{ required: true, message: 'Please specify the aggregator name' }]}
              >
                <Input
                  placeholder="Enter account aggregator name"
                  value={formData.aggregatorName}
                  onChange={(e) => setFormData({ ...formData, aggregatorName: e.target.value })}
                />
              </Form.Item>
              <Form.Item
                className="create-account-aggregator-form-item"
                label="Select Banks"
                name="selectedBanks"
                rules={[{ required: true, message: 'Please select at least one bank' }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select banks"
                  value={formData.selectedBanks}
                  onChange={handleBankSelectChange}
                  optionLabelProp="label"
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      <Divider style={{ margin: '4px 0' }} />
                      <div style={{ padding: 8 }}>
                        <Typography.Text type="secondary">
                          Select banks to add to your aggregator
                        </Typography.Text>
                      </div>
                    </div>
                  )}
                >
                  {bankOptions.map((bank) => (
                    <Option key={bank.bankId} value={bank.bankName} label={bank.bankName}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>{bank.bankName}</div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item className="create-account-aggregator-form-item">
                <Button
                  className="create-account-aggregator-submit-button"
                  type="primary"
                  htmlType="submit"
                  shape="round"
                >
                  Create Aggregator
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CreateAccountAggregator;
