package com.thanet.health_me.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thanet.health_me.models.MenuModel;

@Repository
public interface ImageRepository extends JpaRepository<MenuModel, Long> {
}
