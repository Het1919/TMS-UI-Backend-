package ai.ignosis.repositories;

import ai.ignosis.entities.AccountAggregator;
import ai.ignosis.entities.AccountAggregatorBanks;
import ai.ignosis.entities.Bank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountAggregatorBankRepository extends JpaRepository<AccountAggregatorBanks, Integer>{

	public AccountAggregatorBanks findByAccountAggregatorAndBank(AccountAggregator accountAggregator, Bank bank);
	
}
