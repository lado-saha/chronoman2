package com.minsih.chronoman.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.*;

import com.minsih.chronoman.model.Site;

@Repository
public interface SiteRepository extends JpaRepository<Site, Long> {
    // You can define custom query methods here if needed


    @Query(value = "SELECT s FROM Site s WHERE " +
            "LOWER(s.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(s.town) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(s.region) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(s.country) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Site> search(@Param("query") String query, Pageable pageable);

    @Query("SELECT s.id FROM Site s")
    List<Long> findAllSiteIds();

}
