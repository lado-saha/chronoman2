package com.minsih.chronoman.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.minsih.chronoman.model.Activity;
import com.minsih.chronoman.model.Site;
import com.minsih.chronoman.model.Worker;
import com.minsih.chronoman.service.ActivityService;
import com.minsih.chronoman.service.SiteService;

import java.util.*;

@RestController
@RequestMapping("/api/sites/{siteId}/activities")
public class ActivityController {

    @Autowired
    private ActivityService activityService;
    @Autowired
    private SiteService siteService;

    @PostMapping
    public ResponseEntity<Activity> createActivity(
            @PathVariable Long siteId,
            @RequestBody Activity activity) {
        Site site = siteService.getSiteById(siteId);

        activity.setSite(site);
        Activity savedActivity = activityService.saveActivity(activity);
        return new ResponseEntity<>(savedActivity, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Activity> getActivityById(
            @PathVariable Long siteId,
            @PathVariable Long id) {
        Activity activity = activityService.getActivityById(id);
        return new ResponseEntity<>(activity, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Activity> updateActivity(
            @PathVariable Long siteId,
            @PathVariable Long id,
            @RequestBody Activity activity) {
        Site site = siteService.getSiteById(siteId);
        activity.setSite(site);
        Activity updatedActivity = activityService.saveActivity(activity);
        return new ResponseEntity<>(updatedActivity, HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countActivities(@PathVariable Long siteId) {
        long count = activityService.countActivities(siteId);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(
            @PathVariable Long siteId,
            @PathVariable Long id) {

        activityService.deleteActivity(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<List<Activity>> searchActivities(
            @PathVariable Long siteId,
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Activity> activities;
        if (query == null || query.isBlank()) {
            activities = activityService.findAll(siteId, pageable);
        } else {
            activities = activityService.searchActivities(siteId, query, pageable);
        }
        return new ResponseEntity<>(activities.getContent(), HttpStatus.OK);
    }

    @GetMapping("/{id}/duration")
    public ResponseEntity<Integer> getTotalDuration(
            @PathVariable Long siteId,
            @PathVariable Long id) {
        int duration = activityService.getTotalDuration(id);
        return new ResponseEntity<>(duration, HttpStatus.OK);
    }

    @GetMapping("/{id}/completion")
    public ResponseEntity<Double> getCompletionPercentage(
            @PathVariable Long siteId,
            @PathVariable Long id) {
        double percentage = activityService.getCompletionPercentage(id);
        return new ResponseEntity<>(percentage, HttpStatus.OK);
    }

    @GetMapping("/{id}/budget")
    public ResponseEntity<Double> getTotalBudget(
            @PathVariable Long siteId,
            @PathVariable Long id) {
        double budget = activityService.getTotalBudget(id);
        return new ResponseEntity<>(budget, HttpStatus.OK);
    }

    @GetMapping("/{id}/workers")
    public ResponseEntity<Set<Worker>> getAllWorkersFromActivity(
            @PathVariable Long siteId,
            @PathVariable Long id) {
        Set<Worker> workers = activityService.getAllWorkersFromActivity(id);
        return new ResponseEntity<>(workers, HttpStatus.OK);
    }
}
