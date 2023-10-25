package ai.ignosis.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ai.ignosis.entities.AccountAggregatorBanks;
import ai.ignosis.repositories.AccountAggregatorBankRepository;
import ai.ignosis.services.AccountAggregatorBankService;

@Service
public class AccountAggregatorBankServiceImpl implements AccountAggregatorBankService {

	@Autowired
	private AccountAggregatorBankRepository accountAggregatorBankRepository;

	@Override
	public List<AccountAggregatorBanks> getAllAccountAggregatorsWithBanks() {
		return accountAggregatorBankRepository.findAll();
	}

}
