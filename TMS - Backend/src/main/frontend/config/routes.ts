export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/',
    name: 'Home',
    component: './ViewBanks',
    icon: 'HomeOutlined',
  },
  {
    path: '/bank',
    name: 'Bank',
    icon: 'BankOutlined',
    routes: [
      {
        name: 'Create Bank',
        path: '/bank/create-bank',
        component: './CreateBanks',
      },
    ],
  },
  {
    path: '/account-aggregator',
    name: 'Account Aggregator',
    icon: 'PartitionOutlined',
    routes: [
      {
        name: 'Create Account Aggregator',
        path: '/account-aggregator/create-account-aggregator',
        component: './CreateAccountAggregator',
        icon: 'smile',
      },
      {
        path: '/account-aggregator/all-account-aggregators',
        name: 'GlobalDelta',
        icon: 'smile',
        component: './ShowAccountAggregator',
      },
    ],
  },
  {
    path: '/tenant',
    name: 'Tenant',
    icon: 'AlipayOutlined',
    routes: [
      {
        path: '/tenant/create-tenant',
        name: 'Create Tenant',
        icon: 'smile',
        component: './CreateTenant',
      },
      {
        path: '/tenant/create-aggregator-tenant',
        name: 'Add Aggregators In Tenant',
        icon: 'smile',
        component: './AddAggregatorInTenants',
      },
      // {
      //   path: '/tenant/tenant-aggregator-bank',
      //   name: 'LocalDelta',
      //   icon: 'smile',
      //   component: './ShowTenantWithAggregatorAndBanks',
      // },
      {
        path: '/tenant/all-tenants',
        name: 'TenantList',
        icon: 'smile',
        component: './TenantList',
      },
      {
        path: '/tenant/view-tenant/:tenantName',
        component: './SpecificTenantDetail',
      },
    ],
  },
];
