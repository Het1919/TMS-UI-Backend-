package ai.ignosis.services.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import ai.ignosis.entities.AccountAggregator;
import ai.ignosis.entities.AccountAggregatorBanks;
import ai.ignosis.entities.Bank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ai.ignosis.exceptions.ResourseNotFoundException;
import ai.ignosis.repositories.AccountAggregatorBankRepository;
import ai.ignosis.repositories.AccountAggregatorRepository;
import ai.ignosis.repositories.BankRepository;
import ai.ignosis.services.AccountAggregatorService;

@Service
public class AccountAggregatorServiceImpl implements AccountAggregatorService {

	@Autowired
	private AccountAggregatorRepository accountAggregatorRepository;

	@Autowired
	private BankRepository bankRepository;

	@Autowired
	private AccountAggregatorBankRepository accountAggregatorBankRepository;

	public void addAggregator(String aggregatorName, List<String> bankOptions) {
		AccountAggregator ag = new AccountAggregator();
		ag.setName(aggregatorName);

		accountAggregatorRepository.save(ag);
		Set<Bank> banks = new HashSet<>();
		for (String bankName : bankOptions) {
			List<Bank> b1 = bankRepository.findByBankName(bankName);
			banks.addAll(b1);
			AccountAggregatorBanks accountAggregatorBanks = new AccountAggregatorBanks();
			accountAggregatorBanks.setBank(b1.get(0));
			accountAggregatorBanks.setAccountAggregator(ag);
			accountAggregatorBankRepository.save(accountAggregatorBanks);
		}

	}

	public List<AccountAggregator> getAllAccountAggregators() {
		return accountAggregatorRepository.findAll();
	}

	@Override
	public AccountAggregator getAggregatorById(int id) {
		AccountAggregator accountAggregator = accountAggregatorRepository.findById(id)
				.orElseThrow(() -> new ResourseNotFoundException("Account aggregator does not exist with given id :: " + id));

		return accountAggregator;

	}
}
