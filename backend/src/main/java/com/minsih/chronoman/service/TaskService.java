package com.minsih.chronoman.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.minsih.chronoman.model.Task;
import com.minsih.chronoman.repository.TaskRepository;

@Service
public class TaskService {

  @Autowired
  private TaskRepository taskRepository;

  public Task saveTask(Task task) {
    return taskRepository.save(task);
  }

  public List<Task> getTasksByActivityId(Long activityId) {
    return taskRepository.findByActivityId(activityId);
  }

  public Task getTaskById(Long id) {
    return taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
  }

  public void deleteTask(Long id) {
    taskRepository.deleteById(id);
  }

  public List<Task> findByActivityId(Long activityId) {
    return taskRepository.findByActivityId(activityId);
  }

  public long countTasks() {
    return taskRepository.count();
  }

  public Page<Task> searchTasks(String query, Pageable pageable) {
    return taskRepository.search(query, pageable);
  }

  public Page<Task> findAll(Pageable pageable) {
    return taskRepository.findAll(pageable);
  }
}
