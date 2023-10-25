package ai.ignosis.repositories;

import java.util.List;

import ai.ignosis.entities.AccountAggregator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountAggregatorRepository extends JpaRepository<AccountAggregator, Integer>{

	public List<AccountAggregator> findByName(String name);
}
