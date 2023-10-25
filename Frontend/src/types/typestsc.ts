export interface Bank {
  bankId: number;
  bankName: string;
}

export interface AddBank {
  name: string;
}

export interface AccAgg {
  name: string;
  banks: string[];
}

export interface Tenant {
  name: string;
}

export interface TenantList {
  tenantId: number;
  tenantName: string;
}

export interface GlobalBank {
  bankId: number;
  bankName: string;
}

export interface AccountAggregator {
  id: number;
  name: string;
}

export interface AggregatorBankData {
  id: number;
  accountAggregator: AccountAggregator;
  bank: GlobalBank;
  globalStatus: boolean;
}

export interface TenantAggregator {
  tenantId: number;
  tenantName: string;
}

export interface AggregatorBank {
  accountAggregator: {
    name: string;
  };
  bank: {
    bankId: number;
    bankName: string;
  };
}

export interface TenantBankData {
  tenant: {
    tenantId: number;
    tenantName: string;
  };
  accountAggregator: {
    id: number;
    name: string;
  };
  bank: {
    bankId: number;
    bankName: string;
  };
  status: boolean;
}
