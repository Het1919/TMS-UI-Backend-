package ai.ignosis.payload;

import java.util.List;

public class AccountAggregatorSelectedBankDto {

	private String name;
	private List<String> selectedBanks;
	
	public AccountAggregatorSelectedBankDto() {
		super();
	}
	public AccountAggregatorSelectedBankDto(String name, List<String> selectedBanks) {
		super();
		this.name = name;
		this.selectedBanks = selectedBanks;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<String> getSelectedBanks() {
		return selectedBanks;
	}
	public void setSelectedBanks(List<String> selectedBanks) {
		this.selectedBanks = selectedBanks;
	}
	@Override
	public String toString() {
		return "AccountAggregatorSelectedBankDto [name=" + name + ", selectedBanks=" + selectedBanks + "]";
	}
}
