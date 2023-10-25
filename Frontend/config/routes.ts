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
    component: './BankDetails',
    icon: 'HomeOutlined',
  },
  {
    path: '/account-aggregator',
    name: 'Account Aggregator',
    icon: 'PartitionOutlined',
    routes: [
      {
        path: '/account-aggregator/aggregator-details',
        name: 'GlobalDelta',
        icon: 'smile',
        component: './AggregatorDetails',
      },
    ],
  },
  {
    path: '/tenant',
    name: 'Tenant',
    icon: 'AlipayOutlined',
    routes: [
      {
        path: '/tenant/tenant-details',
        name: 'Tenant Details',
        icon: 'smile',
        component: './TenantDetails',
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
