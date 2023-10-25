package ai.ignosis.payload;

public class BankGlobalStatusDto {
	
	private int bankId;
	private int aggId;
	private boolean status;
	
	public int getBankId() {
		return bankId;
	}
	public void setBankId(int bankId) {
		this.bankId = bankId;
	}
	public int getAggId() {
		return aggId;
	}
	public void setAggId(int aggId) {
		this.aggId = aggId;
	}
	public boolean getStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public BankGlobalStatusDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	public BankGlobalStatusDto(int bankId, int aggId, boolean status) {
		super();
		this.bankId = bankId;
		this.aggId = aggId;
		this.status = status;
	}
	@Override
	public String toString() {
		return "BankGlobalStatusDto [bankId=" + bankId + ", aggId=" + aggId + ", status=" + status + "]";
	}

}
