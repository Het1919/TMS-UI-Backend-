package ai.ignosis.payload;

public class TenantDto {
	
	private String name;

	public TenantDto() {
		super();
	}

	public TenantDto(String name) {
		super();
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "TenantDto [name=" + name + "]";
	}
	

}
