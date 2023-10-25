package ai.ignosis.payload;

import java.util.List;

public class AccountAggregatorDto {
	
	private String name;
	private List<String> banks;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<String> getBanks() {
		return banks;
	}
	public void setBanks(List<String> banks) {
		this.banks = banks;
	}
	public AccountAggregatorDto(String name, List<String> banks) {
		super();
		this.name = name;
		this.banks = banks;
	}
	public AccountAggregatorDto() {
		super();
	}
	@Override
	public String toString() {
		return "AccountAggregatorDto [name=" + name + ", banks=" + banks + "]";
	}
	
}
