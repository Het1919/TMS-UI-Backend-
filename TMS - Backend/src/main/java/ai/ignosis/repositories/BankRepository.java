package ai.ignosis.repositories;

import java.util.List;

import ai.ignosis.entities.Bank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankRepository extends JpaRepository<Bank, Integer>{

	public List<Bank> findByBankName(String bankName);
	
}
