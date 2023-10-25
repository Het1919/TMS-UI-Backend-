package ai.ignosis.controllers;

import java.util.List;

import ai.ignosis.entities.AccountAggregator;
import ai.ignosis.entities.AccountAggregatorBanks;
import ai.ignosis.exceptions.ResourseNotFoundException;
import ai.ignosis.repositories.AccountAggregatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ai.ignosis.payload.AccountAggregatorDto;
import ai.ignosis.services.AccountAggregatorBankService;
import ai.ignosis.services.AccountAggregatorService;

@RestController
@RequestMapping("/api")
public class AccountAggregatorController {

    @Autowired
    private AccountAggregatorService accountAggregatorService;

    @Autowired
    private AccountAggregatorBankService accountAggregatorBankService;

    @GetMapping("/aggregators")
    public ResponseEntity<List<AccountAggregator>> getAllAccountAggregators() {
        try {
            List<AccountAggregator> aggregators = accountAggregatorService.getAllAccountAggregators();
            return new ResponseEntity<>(aggregators, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/aggregators/{id}")
    public ResponseEntity<String> getAggregatorById(@PathVariable(name = "id") int id) {
        try {
            AccountAggregator aggregator = accountAggregatorService.getAggregatorById(id);
            return new ResponseEntity<>("Account Aggregator Found", HttpStatus.OK);
        } catch (ResourseNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/aggregators-banks")
    public ResponseEntity<List<AccountAggregatorBanks>> getAllAccountAggregatorsWithBanks() {
        try {
            List<AccountAggregatorBanks> aggWithBanks = accountAggregatorBankService.getAllAccountAggregatorsWithBanks();
            return new ResponseEntity<>(aggWithBanks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/aggregators")
    public ResponseEntity<String> addAggregator(@RequestBody AccountAggregatorDto aggregator) {
        try {
            accountAggregatorService.addAggregator(aggregator.getName(), aggregator.getBanks());
            return new ResponseEntity<>("Aggregator added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

//    @DeleteMapping("/aggregators/{accAggId}")
//    public void deleteAcccAgg(@PathVariable("accAggId") int accAggId){
//        accountAggregatorRepository.deleteById(accAggId);
//    }

}
