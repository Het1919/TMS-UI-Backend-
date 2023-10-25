package ai.ignosis.services.impl;

import java.util.List;

import ai.ignosis.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ai.ignosis.repositories.AccountAggregatorBankRepository;
import ai.ignosis.repositories.AccountAggregatorRepository;
import ai.ignosis.repositories.BankRepository;
import ai.ignosis.repositories.TenantAggregatorBankRepository;
import ai.ignosis.repositories.TenantRepository;
import ai.ignosis.services.BankService;

import ai.ignosis.exceptions.ResourseNotFoundException;

@Service
public class BankServiceImpl implements BankService {

	private final BankRepository bankRepository;

	@Autowired
	private TenantRepository tenantRepository;

	@Autowired
	private AccountAggregatorRepository accountAggregatorRepository;

	@Autowired
	private TenantAggregatorBankRepository tenantAggregatorBankRepository;

	@Autowired
	private AccountAggregatorBankRepository accountAggregatorBankRepository;

	@Autowired
	public BankServiceImpl(BankRepository bankRepository) {
		this.bankRepository = bankRepository;
	}

	public List<Bank> getAllBanks() {
		return bankRepository.findAll();
	}

	public List<Bank> getBankByName(String name) {
		List<Bank> bank = bankRepository.findByBankName(name);
		return bank;
	}

	public void updateGlobalStatus(int aggId, int bankId, boolean status) {

		AccountAggregator accountAggregator = accountAggregatorRepository.findById(aggId).get();
		Bank bank = bankRepository.findById(bankId).get();

		AccountAggregatorBanks accountAggregatorAndBank = accountAggregatorBankRepository
				.findByAccountAggregatorAndBank(accountAggregator, bank);
		accountAggregatorAndBank.setGlobalStatus(status);
		accountAggregatorBankRepository.save(accountAggregatorAndBank);

		List<Tenant> listOfTenants = tenantRepository.findAll();

		for (Tenant t : listOfTenants) {
			Tenant tenant = tenantRepository.findById(t.getTenantId()).get();

			TenantAggregatorBank tenantAndAccountAggregatorAndBank = tenantAggregatorBankRepository
					.findByTenantAndAccountAggregatorAndBank(tenant, accountAggregator, bank);
			if (tenantAndAccountAggregatorAndBank != null) {
				// System.out.println(tenant);
				tenantAndAccountAggregatorAndBank.setStatus(status);
				tenantAggregatorBankRepository.save(tenantAndAccountAggregatorAndBank);
				// System.out.println(tenant.getTenantId() + "==="+ accountAggregator.getId() +
				// "===" + bank.getBankId());
			}
		}

	}

	public void createBanks(String name) {
		Bank b = new Bank();
		b.setBankName(name);
		bankRepository.save(b);
	}

	public void updateLocalStatus(int tId, int agId, int bId, boolean status) {

		Tenant tenant = tenantRepository.findById(tId).get();
		AccountAggregator accountAggregator = accountAggregatorRepository.findById(agId).get();
		Bank bank = bankRepository.findById(bId).get();

		TenantAggregatorBank tenantAndAccountAggregatorAndBank = tenantAggregatorBankRepository
				.findByTenantAndAccountAggregatorAndBank(tenant, accountAggregator, bank);
		if (tenantAndAccountAggregatorAndBank != null) {
			tenantAndAccountAggregatorAndBank.setStatus(status);
			tenantAggregatorBankRepository.save(tenantAndAccountAggregatorAndBank);
		}
	}

	@Override
	public Bank getBankById(int id) {
		Bank bank = bankRepository.findById(id)
				.orElseThrow(() -> new ResourseNotFoundException("Bank does not exist with given id :: " + id));
		return bank;
	}
}
