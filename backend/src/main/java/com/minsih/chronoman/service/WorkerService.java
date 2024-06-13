package com.minsih.chronoman.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.minsih.chronoman.model.Worker;
import com.minsih.chronoman.repository.WorkerRepository;

import java.util.List;

@Service
public class WorkerService {
  public long countWorkers() {
    return workerRepository.count();
  }

  @Autowired
  private WorkerRepository workerRepository;

  public Worker saveWorker(Worker worker) {
    return workerRepository.save(worker);
  }

  public Worker getWorkerById(Long id) {
    return workerRepository.findById(id).orElseThrow(() -> new RuntimeException("Worker not found"));
  }

  public List<Worker> getAllWorkers() {
    return workerRepository.findAll();
  }

  public void deleteWorker(Long id) {
    workerRepository.deleteById(id);
  }

  public Page<Worker> searchWorkers(String query, Pageable pageable) {
    return workerRepository.search(query, pageable);
  }

  public Page<Worker> findAll(Pageable pageable) {
    return workerRepository.findAll(pageable);
  }

}
