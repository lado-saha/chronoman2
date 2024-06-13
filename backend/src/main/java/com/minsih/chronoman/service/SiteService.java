package com.minsih.chronoman.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.minsih.chronoman.model.Activity;
import com.minsih.chronoman.model.PredefinedActivity;
import com.minsih.chronoman.model.PredefinedTask;
import com.minsih.chronoman.model.Site;
import com.minsih.chronoman.model.Task;
import com.minsih.chronoman.model.TaskStatus;
import com.minsih.chronoman.model.Worker;
import com.minsih.chronoman.repository.ActivityRepository;
import com.minsih.chronoman.repository.PredefinedActivityRepository;
import com.minsih.chronoman.repository.SiteRepository;
import com.minsih.chronoman.repository.TaskRepository;

@Service
public class SiteService {
  @Autowired
  private SiteRepository siteRepository;

  @Autowired
  private ActivityRepository activityRepository;

  @Autowired
  private TaskRepository taskRepository;

  @Autowired
  private PredefinedActivityRepository predefinedActivityRepository;

  @Transactional
  public Site createSite(Site site) {
    Site savedSite = siteRepository.save(site);
    createActivitiesAndTasksForSite(savedSite);
    return savedSite;
  }

  public long countSites() {
    return siteRepository.count();
  }

  private void createActivitiesAndTasksForSite(Site site) {
    List<PredefinedActivity> predefinedActivities = predefinedActivityRepository.findAll();
    for (PredefinedActivity predefinedActivity : predefinedActivities) {
      Activity activity = new Activity();
      activity.setName(predefinedActivity.getName());
      activity.setDescription(predefinedActivity.getDescription());
      activity.setSite(site);
      activityRepository.save(activity);
      for (PredefinedTask predefinedTask : predefinedActivity.getPredefinedTasks()) {
        Task task = new Task();
        task.setName(predefinedTask.getName());
        task.setDescription(predefinedTask.getDescription());
        task.setActivity(activity);
        taskRepository.save(task);
        // activity.getTasks().add(task);
      }
    }
  }

  public int getTotalDuration(Long siteId) {

    Site site = siteRepository.findById(siteId)
        .orElseThrow(() -> new RuntimeException("Site not found"));
    return site.getActivities().stream()
        .mapToInt(activity -> activity.getTasks().stream().mapToInt(Task::getDuration).sum())
        .sum();
  }

  public double getCompletionPercentage(Long siteId) {
    Site site = siteRepository.findById(siteId)
        .orElseThrow(() -> new RuntimeException("Site not found"));
    long totalTasks = site.getActivities().stream()
        .flatMap(activity -> activity.getTasks().stream())
        .count();
    long completedTasks = site.getActivities().stream()
        .flatMap(activity -> activity.getTasks().stream())
        .filter(task -> TaskStatus.COMPLETED == task.getStatus())
        .count();
    return totalTasks > 0 ? (double) completedTasks / totalTasks * 100 : 0;
  }

  public double getTotalBudget(Long siteId) {
    Site site = siteRepository.findById(siteId)
        .orElseThrow(() -> new RuntimeException("Site not found"));

    System.out.println("Site: " + site);
    System.out.println("Activities: " + site.getActivities());

    return site.getActivities().stream()
        .flatMap(activity -> {
            System.out.println("Activity: " + activity);
            return activity.getTasks().stream();
        })
        .mapToDouble(task -> {
            System.out.println("Task: " + task);
            Double budget = task.getBudget();
            if (budget == null) {
                System.out.println("Task with null budget: " + task);
                return 0.0;
            }
            return budget;
        })
        .sum();
}


  public Set<Worker> getAllWorkersFromSite(Long siteId) {
    Site site = siteRepository.findById(siteId)
        .orElseThrow(() -> new RuntimeException("Site not found"));
    return site.getActivities().stream()
        .flatMap(activity -> activity.getTasks().stream())
        .flatMap(task -> task.getWorkers().stream())
        .collect(Collectors.toSet());
  }

  public Page<Site> searchSites(String query, Pageable pageable) {
    return siteRepository.search(query, pageable);
  }

  public Page<Site> findAll(Pageable pageable) {
    return siteRepository.findAll(pageable);
  }

  public Site saveSite(Site site) {
    return siteRepository.save(site);
  }

  public Site getSiteById(Long id) {
    return siteRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Site not found"));
  }

  public void deleteSite(Long id) {
    siteRepository.deleteById(id);
  }
}