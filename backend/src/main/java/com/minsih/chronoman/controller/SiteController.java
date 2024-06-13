package com.minsih.chronoman.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.minsih.chronoman.model.Site;
import com.minsih.chronoman.model.Worker;
import com.minsih.chronoman.service.SiteService;

@RestController
@RequestMapping("/api/sites")
public class SiteController {

    @Autowired
    private SiteService siteService;

    @PostMapping
    public ResponseEntity<Site> createSite(@RequestBody Site site) {
        Site savedSite = siteService.createSite(site);
        return new ResponseEntity<>(savedSite, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Site> getSiteById(@PathVariable Long id) {
        Site site = siteService.getSiteById(id);
        return new ResponseEntity<>(site, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Site> updateSite(@PathVariable Long id, @RequestBody Site site) {
        site.setId(id);
        Site updatedSite = siteService.saveSite(site);
        return new ResponseEntity<>(updatedSite, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSite(@PathVariable Long id) {
        siteService.deleteSite(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countSites() {
        long count = siteService.countSites();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Site>> searchSites(
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Site> sites;
        if (name.isBlank())
            sites = siteService.findAll(pageable);
        else
            sites = siteService.searchSites(name, pageable);
        return new ResponseEntity<>(sites.getContent(), HttpStatus.OK);
    }

    @GetMapping("/{id}/duration")
    public ResponseEntity<Integer> getTotalDuration(@PathVariable Long id) {
        int duration = siteService.getTotalDuration(id);
        return new ResponseEntity<>(duration, HttpStatus.OK);
    }

    @GetMapping("/{id}/completion")
    public ResponseEntity<Double> getCompletionPercentage(@PathVariable Long id) {
        double percentage = siteService.getCompletionPercentage(id);
        return new ResponseEntity<>(percentage, HttpStatus.OK);
    }

    @GetMapping("/{id}/budget")
    public ResponseEntity<Double> getTotalBudget(@PathVariable Long id) {
        double budget = siteService.getTotalBudget(id);
        return new ResponseEntity<>(budget, HttpStatus.OK);
    }

    @GetMapping("/{id}/workers")
    public ResponseEntity<Set<Worker>> getAllWorkersFromSite(@PathVariable Long id) {
        Set<Worker> workers = siteService.getAllWorkersFromSite(id);
        return new ResponseEntity<>(workers, HttpStatus.OK);
    }
}
