package com.minsih.chronoman.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.minsih.chronoman.model.PredefinedActivity;

@Repository
public interface PredefinedActivityRepository extends JpaRepository<PredefinedActivity, Long> {
    // You can define custom query methods here if needed
}
