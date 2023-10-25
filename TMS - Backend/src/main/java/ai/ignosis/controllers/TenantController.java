package ai.ignosis.controllers;

import java.util.List;

import ai.ignosis.entities.Tenant;
import ai.ignosis.entities.TenantAggregatorBank;
import ai.ignosis.exceptions.ResourseNotFoundException;
import ai.ignosis.repositories.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ai.ignosis.payload.AccountAggregatorSelectedBankDto;
import ai.ignosis.payload.TenantDto;
import ai.ignosis.services.TenantAggregatorBankService;
import ai.ignosis.services.TenantService;

@RestController
@RequestMapping("/api")
public class TenantController {

	@Autowired
	private TenantService tenantService;
	
	@Autowired
	private TenantAggregatorBankService tenantAggregatorBankService;

	@GetMapping("/tenants")
	public ResponseEntity<List<Tenant>> getAllTenants() {
		try {
			List<Tenant> tenants = tenantService.getAllTenants();
			return new ResponseEntity<>(tenants, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/tenants/{id}")
	public ResponseEntity<String> getTenantById(@PathVariable(name="id") int tenantId) {
		try {
			Tenant tenant = tenantService.getTenantById(tenantId);
			return new ResponseEntity<>("Tenant Found", HttpStatus.OK);
		} catch (ResourseNotFoundException e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/tenants-aggregators-banks")
	public ResponseEntity<List<TenantAggregatorBank>> getAllTenantsWithAggregatorsAndBanks()
	{
		try {
			List<TenantAggregatorBank> tenantsWithAggregators = tenantAggregatorBankService.getAllTenantsWithAggregatorsAndBanks();
			return new ResponseEntity<>(tenantsWithAggregators,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/tenants")
	public ResponseEntity<String> addTenant(@RequestBody TenantDto tenantDto) {
		try {
			tenantService.saveTenant(tenantDto.getName());
			return new ResponseEntity<>("Tenant Created successfully", HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/tenants-aggregators/{id}")
	public ResponseEntity<String> addAggregatorInTenant(@PathVariable(name = "id") int tenantId,
			@RequestBody AccountAggregatorSelectedBankDto accountAggregatorSelectedBankDto) {
		try {
			tenantService.addAggregatorInTenant(tenantId, accountAggregatorSelectedBankDto.getName(),
					accountAggregatorSelectedBankDto.getSelectedBanks());
			return new ResponseEntity<>("Aggregator added inside Tenant", HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}


}