package ai.ignosis.entities;

import jakarta.persistence.*;

@Entity
public class TenantAggregatorBank {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

	@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
	@JoinColumn(name = "tId", referencedColumnName = "tenantId")
	private Tenant tenant;

	@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
	@JoinColumn(name = "agId", referencedColumnName = "id")
	private AccountAggregator accountAggregator;

	@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
	@JoinColumn(name = "bId", referencedColumnName = "bankId")
	private Bank bank;

    private boolean status;

	public TenantAggregatorBank() {
		super();
	}

	public TenantAggregatorBank(int id, Tenant tenant, AccountAggregator accountAggregator, Bank bank, boolean status) {
		super();
		this.id = id;
		this.tenant = tenant;
		this.accountAggregator = accountAggregator;
		this.bank = bank;
		this.status = status;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public Tenant getTenant() {
		return tenant;
	}
	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
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

	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "TenantAggregatorBank [id=" + id + ", tenant=" + tenant + ", accountAggregator=" + accountAggregator
				+ ", bank=" + bank + ", status=" + status + "]";
	}

}
