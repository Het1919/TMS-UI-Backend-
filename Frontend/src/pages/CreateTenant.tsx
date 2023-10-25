import { ProCard } from '@ant-design/pro-card';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Button, message } from 'antd';
import addTenant from '../apis/tenants/addTenant';

const CreateTenant = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 300);
  // }, []);

  const handleFormSubmit = async (values: { tenantName: string }) => {
    try {
      // setIsLoading(true);
      const postData = {
        name: values.tenantName,
      };

      await addTenant(postData);
      message.success('Tenant successfully created', 2);
      // navigate('/tenant/create-aggregator-tenant');
    } catch (error) {
      message.error('Tenant with this name already exists', 2);
    }
    // } finally {
    //   // setIsLoading(false);
    // }
  };

  return (
    <>
      {/* {isLoading ? (
        <Spin size="large" />
      ) : ( */}
      <div className="create-tenant-container">
        <ProCard className="create-tenant-card">
          {/* <Typography.Title level={2}>Create Tenant</Typography.Title>
          <Divider /> */}
          <ProForm
            onFinish={handleFormSubmit}
            submitter={{
              render: () => (
                <div className="submit-button-container" style={{ textAlign: 'center' }}>
                  <Button type="primary" htmlType="submit" shape="round" style={{ width: '6rem' }}>
                    Add Tenant
                  </Button>
                </div>
              ),
            }}
          >
            <ProFormText
              name="tenantName"
              label="Tenant Name"
              placeholder="Enter the Tenant name"
              rules={[
                {
                  required: true,
                  message: 'Please specify the Tenant name',
                },
              ]}
            />
          </ProForm>
        </ProCard>
      </div>
      {/* )} */}
    </>
  );
};

export default CreateTenant;
