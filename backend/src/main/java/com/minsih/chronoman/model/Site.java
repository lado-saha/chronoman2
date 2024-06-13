package com.minsih.chronoman.model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
/**
 * Represents a construction site in the construction management system.
 * Each site belongs to a project and is located at a specific location.
 * It has a name, start date, estimation duration, status, and timestamps
 * for creation and last update.
 */
import lombok.Data;

@Entity
@Data
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Site {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  // @ManyToOne
  // @JoinColumn(name = "user_id", nullable = false)
  // private String ;

  private String name;

  private LocalDate startDate;

  @OneToMany(mappedBy = "site", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference
  private List<Activity> activities;

  private Double latitude;

  private Double longitude;

  private String town;

  private String country;

  private String region;

  private String description;

  @Override
    public String toString() {
        return "Site{" +
               "id=" + id +
               ", name='" + name + '\'' +
               ", activities=" + (activities != null ? activities.stream().map(Activity::getId).toList() : "null") + // Print only activity IDs
               '}';
    }
}
