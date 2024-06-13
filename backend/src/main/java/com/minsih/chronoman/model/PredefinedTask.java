package com.minsih.chronoman.model;

/**
 * Represents a predefined task in the construction management system.
 * Each predefined task has an ID, name, description, and is associated
 * with a predefined activity.
 */
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class PredefinedTask {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "predefined_activity_id", nullable = false)
  @JsonBackReference
  private PredefinedActivity predefinedActivity;

  private String description;

  private String name;
}
