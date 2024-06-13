package com.minsih.chronoman.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.minsih.chronoman.model.PredefinedTask;
import com.minsih.chronoman.repository.PredefinedTaskRepository;

@Service
public class PredefinedTaskService {

  @Autowired
  private PredefinedTaskRepository predefinedTaskRepository;

  public PredefinedTask findById(Long id) {
    return predefinedTaskRepository.findById(id).orElse(null);
  }

  public List<PredefinedTask> findAll() {
    return predefinedTaskRepository.findAll();
  }

  public PredefinedTask save(PredefinedTask predefinedTask) {
    return predefinedTaskRepository.save(predefinedTask);
  }

  public void deleteById(Long id) {
    predefinedTaskRepository.deleteById(id);
  }

  public List<PredefinedTask> findByPredefinedActivityId(Long activityId) {
    return predefinedTaskRepository.findByPredefinedActivityId(activityId);
  }
}
