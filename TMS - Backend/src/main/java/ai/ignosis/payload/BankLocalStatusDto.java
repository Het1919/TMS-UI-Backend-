package ai.ignosis.payload;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema
public class BankLocalStatusDto {
	
	@Schema(name = "tId")
	private int tId;
	private int agId;
	@Schema(name = "bId")
	private int bId;
	private boolean status;
	
	public BankLocalStatusDto() {
		super();
	}
	
	public BankLocalStatusDto(int tId, int agId, int bId, boolean status) {
		super();
		this.tId = tId;
		this.agId = agId;
		this.bId = bId;
		this.status = status;
	}
	
	public int gettId() {
		return tId;
	}
	public void settId(int tId) {
		this.tId = tId;
	}
	public int getAgId() {
		return agId;
	}
	public void setAgId(int agId) {
		this.agId = agId;
	}
	public int getbId() {
		return bId;
	}
	public void setbId(int bId) {
		this.bId = bId;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	
	@Override
	public String toString() {
		return "BankLocalStatusDao [tId=" + tId + ", agId=" + agId + ", bId=" + bId + ", status=" + status + "]";
	}	

}
