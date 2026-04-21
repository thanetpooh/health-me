package com.thanet.health_me.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thanet.health_me.dtos.InstructionResponseDto;
import com.thanet.health_me.models.InstructionModel;

public interface InstructionRepository extends JpaRepository<InstructionModel, Long> {

    List<InstructionResponseDto> findByMenuIdOrderByStepNumberAsc(Long menuId);
}