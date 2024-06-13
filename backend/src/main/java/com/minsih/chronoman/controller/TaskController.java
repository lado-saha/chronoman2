package com.minsih.chronoman.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.minsih.chronoman.model.Task;
import com.minsih.chronoman.service.TaskService;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

  @Autowired
  private TaskService taskService;

  @PostMapping
  public ResponseEntity<Task> createTask(@RequestBody Task task) {
    Task savedTask = taskService.saveTask(task);
    return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
    Task task = taskService.getTaskById(id);
    return new ResponseEntity<>(task, HttpStatus.OK);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task) {
    task.setId(id);
    Task updatedTask = taskService.saveTask(task);
    return new ResponseEntity<>(updatedTask, HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
    taskService.deleteTask(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @GetMapping("/count")
  public ResponseEntity<Long> countTasks() {
    long count = taskService.countTasks();
    return new ResponseEntity<>(count, HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity<List<Task>> searchSites(
      @RequestParam(required = false) String query,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int size) {
    Pageable pageable = PageRequest.of(page - 1, size);
    Page<Task> tasks;
    if (query.isBlank())
      tasks = taskService.findAll(pageable);
    else
      tasks = taskService.searchTasks(query, pageable);
    return new ResponseEntity<>(tasks.getContent(), HttpStatus.OK);
  }
}
