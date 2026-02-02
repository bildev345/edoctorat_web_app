package org.example.doctoratrestapi.directeurPole.services;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.directeurCed.CedRepository;
import org.example.doctoratrestapi.dtos.commission.CommissionPoleDto;
import org.example.doctoratrestapi.mappers.commission.CommissionPoleMapper;
import org.example.doctoratrestapi.repositories.CommissionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommissionPoleService {

    private final CommissionRepository commissionRepository;
    private final CedRepository cedRepository;
    private final CommissionPoleMapper mapper;

    @Transactional(readOnly = true)
    public Page<CommissionPoleDto> getCommissions(Pageable pageable) {
        // 1. Get all CEDs managed by this Director
        List<Long> cedIds = cedRepository.findAllCedIds();

        // 2. Fetch paginated commissions and map them
        return commissionRepository.findByCedIds(cedIds, pageable)
                .map(mapper::toDto);
    }
}