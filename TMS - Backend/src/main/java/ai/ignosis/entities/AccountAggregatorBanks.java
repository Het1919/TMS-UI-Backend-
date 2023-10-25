package ai.ignosis.entities;

import jakarta.persistence.*;

@Entity
public class AccountAggregatorBanks {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.MERGE})
    @JoinColumn(name = "agId", referencedColumnName = "id")
    private AccountAggregator accountAggregator;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.MERGE})
    @JoinColumn(name = "bId", referencedColumnName = "bankId")
    private Bank bank;

    private boolean globalStatus = true;

	public AccountAggregatorBanks() {
		super();
	}

	public AccountAggregatorBanks(int id, AccountAggregator accountAggregator, Bank bank, boolean globalStatus) {
		super();
		this.id = id;
		this.accountAggregator = accountAggregator;
		this.bank = bank;
		this.globalStatus = globalStatus;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public AccountAggregator getAccountAggregator() {
		return accountAggregator;
	}

	public void setAccountAggregator(AccountAggregator accountAggregator) {
		this.accountAggregator = accountAggregator;
	}

	public Bank getBank() {
		return bank;
	}

	public void setBank(Bank bank) {
		this.bank = bank;
	}

	public boolean isGlobalStatus() {
		return globalStatus;
	}

	public void setGlobalStatus(boolean globalStatus) {
		this.globalStatus = globalStatus;
	}

	@Override
	public String toString() {
		return "AccountAggregatorBanks [id=" + id + ", accountAggregator=" + accountAggregator + ", bank=" + bank
				+ ", globalStatus=" + globalStatus + "]";
	}

}



