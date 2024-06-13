package com.minsih.chronoman.service;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.minsih.chronoman.model.Activity;
import com.minsih.chronoman.model.TaskStatus;
import com.minsih.chronoman.model.Worker;
import com.minsih.chronoman.model.Task;
import com.minsih.chronoman.repository.ActivityRepository;

@Service
public class ActivityService {
  @Autowired
  private ActivityRepository activityRepository;

  public long countActivities(Long siteId) {
    return activityRepository.countBySiteId(siteId);
  }

  public Page<Activity> searchActivities(Long siteId, String query, Pageable pageable) {
    return activityRepository.search(siteId, query, pageable);
  }

  public Page<Activity> findAll(Long siteId, Pageable pageable) {
    return activityRepository.findBySiteId(siteId, pageable);
  }

  public Activity saveActivity(Activity activity) {
    return activityRepository.save(activity);
  }

  public Activity getActivityById(Long id) {
    return activityRepository.findById(id).orElseThrow(() -> new RuntimeException("Activity not found"));
  }

  public void deleteActivity(Long id) {
    activityRepository.deleteById(id);
  }

  public int getTotalDuration(Long activityId) {
    Activity activity = activityRepository.findById(activityId)
        .orElseThrow(() -> new RuntimeException("Activity not found"));
    return activity.getTasks().stream()
        .mapToInt(Task::getDuration)
        .sum();
  }

  public double getCompletionPercentage(Long activityId) {
    Activity activity = activityRepository.findById(activityId)
        .orElseThrow(() -> new RuntimeException("Activity not found"));
    long totalTasks = activity.getTasks().size();
    long completedTasks = activity.getTasks().stream()
        .filter(task -> TaskStatus.COMPLETED == task.getStatus())
        .count();
    return totalTasks > 0 ? (double) completedTasks / totalTasks * 100 : 0;
  }

  public double getTotalBudget(Long activityId) {
    Activity activity = activityRepository.findById(activityId)
        .orElseThrow(() -> new RuntimeException("Activity not found"));
    return activity.getTasks().stream()
        .mapToDouble(Task::getBudget)
        .sum();
  }

  public Set<Worker> getAllWorkersFromActivity(Long activityId) {
    Activity activity = activityRepository.findById(activityId)
        .orElseThrow(() -> new RuntimeException("Activity not found"));
    return activity.getTasks().stream()
        .flatMap(task -> task.getWorkers().stream())
        .collect(Collectors.toSet());
  }

}
