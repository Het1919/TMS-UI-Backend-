package ai.ignosis.entities;

import java.util.*;

import jakarta.persistence.*;

@Entity
public class Tenant {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int tenantId;
	
	@Column(unique = true)
	private String tenantName;
	
	@ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
	private Set<AccountAggregator> accountAggregators = new HashSet<>();

	public int getTenantId() {
		return tenantId;
	}

	public void setTenantId(int tenantId) {
		this.tenantId = tenantId;
	}

	public String getTenantName() {
		return tenantName;
	}

	public void setTenantName(String tenantName) {
		this.tenantName = tenantName;
	}

	public Set<AccountAggregator> getAccountAggregators() {
		return accountAggregators;
	}

	public void setAccountAggregators(Set<AccountAggregator> accountAggregators) {
		this.accountAggregators = accountAggregators;
	}


	public Tenant(int tenantId, String tenantName, Set<AccountAggregator> accountAggregators) {
		super();
		this.tenantId = tenantId;
		this.tenantName = tenantName;
		this.accountAggregators = accountAggregators;
	}

	@Override
	public String toString() {
		return "Tenant [tenantId=" + tenantId + ", tenantName=" + tenantName + ", accountAggregators="
				+ accountAggregators + "]";
	}

	public Tenant() {
		super();
	}

}