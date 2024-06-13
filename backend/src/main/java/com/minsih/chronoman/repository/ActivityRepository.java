package com.minsih.chronoman.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.minsih.chronoman.model.Activity;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    // You can define custom query methods here if needed
    Page<Activity> findBySiteId(Long siteId, Pageable pageable);

    @Query("SELECT a FROM Activity a WHERE a.site.id = :siteId AND (" +
            "LOWER(a.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(a.description) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<Activity> search(@Param("siteId") Long siteId, @Param("query") String query, Pageable pageable);

    long countBySiteId(Long siteId);

}
