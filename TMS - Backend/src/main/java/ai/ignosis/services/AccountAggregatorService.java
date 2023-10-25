package ai.ignosis.services;

import ai.ignosis.entities.AccountAggregator;

import java.util.List;

public interface AccountAggregatorService {

	public void addAggregator(String aggregatorName, List<String> bankOptions) ;

	public List<AccountAggregator> getAllAccountAggregators();

	public AccountAggregator getAggregatorById(int id);
}
