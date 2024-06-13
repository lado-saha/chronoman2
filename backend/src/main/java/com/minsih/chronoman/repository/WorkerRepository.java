package com.minsih.chronoman.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.minsih.chronoman.model.Worker;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, Long> {
  @Query("SELECT w FROM Worker w WHERE " +
      "LOWER(w.name) LIKE LOWER(CONCAT('%', :query, '%'))")
  Page<Worker> search(@Param("query") String query, Pageable pageable);
}
