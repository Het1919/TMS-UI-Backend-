import { ProCard } from '@ant-design/pro-card';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Button, Divider, Spin, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import addBanks from '../apis/banks/addBanks';
import './CreateBanks.css';

const CreateBanks: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  const handleFormSubmit = async (values: { bankName: string }) => {
    try {
      setIsLoading(true);

      const postData = {
        name: values.bankName,
      };

      await addBanks(postData);
      message.success('Bank successfully created', 2);
    } catch (error) {
      message.error('Bank with this name already exists', 2);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <div className="create-bank-container">
          <ProCard className="create-bank-card">
            <Typography.Title level={2}>Create Bank</Typography.Title>
            <Divider />
            <ProForm
              onFinish={handleFormSubmit}
              submitter={{
                render: () => (
                  <div className="submit-button-container">
                    <Button
                      type="primary"
                      htmlType="submit"
                      shape="round"
                      style={{ width: '8rem' }}
                    >
                      Add Bank
                    </Button>
                  </div>
                ),
              }}
            >
              <ProFormText
                name="bankName"
                label="Bank Name"
                placeholder="Enter the Bank name"
                rules={[
                  {
                    required: true,
                    message: 'Please specify the Bank name',
                  },
                ]}
              />
            </ProForm>
          </ProCard>
        </div>
      )}
    </>
  );
};

export default CreateBanks;
