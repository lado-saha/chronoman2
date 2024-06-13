package com.minsih.chronoman.model;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;

/**
 * Represents a task in the construction management system.
 * Each task is associated with an activity and a predefined task.
 * It has an ID, activity ID, predefined task ID, status, duration, comment,
 * start date, real end date,
 * and timestamps for creation and last update.
 */

@Entity
@Data
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Task {

  private String name;
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "activity_id")
  @JsonBackReference
  private Activity activity;

  private int duration;

  private String description;

  @Enumerated(EnumType.STRING)
  private TaskStatus status = TaskStatus.PENDING;

  @ManyToMany
  @JoinTable(name = "task_worker", joinColumns = @JoinColumn(name = "task_id"), inverseJoinColumns = @JoinColumn(name = "worker_id"))
  @Column(nullable = true)
  private List<Worker> workers;

  private Double budget;

  private LocalDateTime realStartDate;

  private LocalDateTime realEndDate;
  // Constructors, getters, and setters
}