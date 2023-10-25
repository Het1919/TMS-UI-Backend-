package ai.ignosis.services;

import ai.ignosis.entities.TenantAggregatorBank;

import java.util.List;

public interface TenantAggregatorBankService {

	public List<TenantAggregatorBank> getAllTenantsWithAggregatorsAndBanks();
}
