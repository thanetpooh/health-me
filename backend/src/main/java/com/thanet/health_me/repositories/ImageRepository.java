package com.thanet.health_me.repositories;

import com.thanet.health_me.models.MenuModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<MenuModel, Long> {
}
