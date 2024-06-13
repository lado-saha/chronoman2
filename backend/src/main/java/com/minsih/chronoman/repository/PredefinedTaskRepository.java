package com.minsih.chronoman.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.minsih.chronoman.model.PredefinedActivity;
import com.minsih.chronoman.model.PredefinedTask;
import java.util.*;

@Repository
public interface PredefinedTaskRepository extends JpaRepository<PredefinedTask, Long> {
    // You can define custom query methods here if needed
    List<PredefinedTask> findByPredefinedActivityId(Long activityId);

    List<PredefinedTask> findByPredefinedActivity(PredefinedActivity predefinedActivity);
}
