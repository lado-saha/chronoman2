package com.minsih.chronoman.model;

// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
/**
 * Represents a user in the construction management system.
 * Each user has an ID, hashed password, name, role, and timestamps for creation, 
 * last update, and last login.
 */
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(nullable = false, length = 255)
  private String password;

  @Column(length = 255)
  private String name;

  @Column(length = 255, unique = true)
  private String email;

  @Column(nullable = false, length = 50)
  private String role;

  @Temporal(TemporalType.TIMESTAMP)
  @CreationTimestamp
  private Date createdAt;

  @Temporal(TemporalType.TIMESTAMP)
  @UpdateTimestamp
  private Date updatedAt;

  @Temporal(TemporalType.TIMESTAMP)
  private Date lastLogin;

  // Constructors, getters, and setters
}
