package com.minsih.chronoman.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.minsih.chronoman.model.Worker;
import com.minsih.chronoman.service.WorkerService;

import java.util.List;

@RestController
@RequestMapping("/api/workers")
public class WorkerController {

  @Autowired
  private WorkerService workerService;

  @PostMapping
  public ResponseEntity<Worker> createWorker(@RequestBody Worker worker) {
    Worker savedWorker = workerService.saveWorker(worker);
    return new ResponseEntity<>(savedWorker, HttpStatus.CREATED);
  }

  @GetMapping("/count")
  public ResponseEntity<Long> countWorkers() {
    long count = workerService.countWorkers();
    return new ResponseEntity<>(count, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Worker> getWorkerById(@PathVariable Long id) {
    Worker worker = workerService.getWorkerById(id);
    return new ResponseEntity<>(worker, HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity<List<Worker>> searchWorkers(
      @RequestParam(required = false) String name,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int size) {
    PageRequest pageable = PageRequest.of(page - 1, size);
    Page<Worker> workers;
    if (name.isBlank())
      workers = workerService.findAll(pageable);
    else
      workers = workerService.searchWorkers(name, pageable);
    return new ResponseEntity<>(workers.getContent(), HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteWorker(@PathVariable Long id) {
    workerService.deleteWorker(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
