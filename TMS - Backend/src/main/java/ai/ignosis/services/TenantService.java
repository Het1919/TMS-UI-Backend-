package ai.ignosis.services;

import ai.ignosis.entities.Tenant;

import java.util.*;

public interface TenantService {

	public void saveTenant(String tenantName);

	public void addAggregatorInTenant(int tenantId, String name, List<String> selectedBanks);

	public List<Tenant> getAllTenants();

	public Tenant getTenantById(int tenantId);

}
