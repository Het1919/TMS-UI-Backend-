package ai.ignosis.entities;

import java.util.*;

import jakarta.persistence.*;

@Entity
public class Bank {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int bankId;
	@Column(unique = true)
	private String bankName;
	
	@OneToMany(mappedBy = "bank", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<AccountAggregatorBanks> accountAggregatorBanks = new HashSet<>();

	public Bank() {
		super();
	}

	public Bank(int bankId, String bankName) {
		super();
		this.bankId = bankId;
		this.bankName = bankName;
	}

	public Bank(Bank b) {
		this.bankName = b.bankName;
	}

	public Bank(String bankName) {
		super();
		this.bankName = bankName;
	}

	public int getBankId() {
		return bankId;
	}

	public void setBankId(int bankId) {
		this.bankId = bankId;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	@Override
	public String toString() {
		return "Bank [bankId=" + bankId + ", bankName=" + bankName + ", accountAggregatorBanks="
				+ accountAggregatorBanks + "]";
	}

}