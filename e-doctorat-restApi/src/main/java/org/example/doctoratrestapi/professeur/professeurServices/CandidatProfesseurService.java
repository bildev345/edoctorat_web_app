package org.example.doctoratrestapi.professeur.professeurServices;

import org.example.doctoratrestapi.candidat.CandidatRepository;
import org.example.doctoratrestapi.dtos.annexe.AnnexeDto;
import org.example.doctoratrestapi.dtos.diplome.DiplomeDto;
import org.example.doctoratrestapi.dtos.professeur.CandidatProfDetailDto;
import org.example.doctoratrestapi.dtos.professeur.CandidatProfListDto;
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.mappers.annexe.AnnexeMapper;
import org.example.doctoratrestapi.mappers.diplome.DiplomeMapper;
import org.example.doctoratrestapi.models.AnnexeModel;
import org.example.doctoratrestapi.models.CandidatModel;
import org.example.doctoratrestapi.repositories.AnnexeRepository;
import org.example.doctoratrestapi.utils.SecurityUtils;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CandidatProfesseurService {

    private final CandidatRepository candidatRep;
    private final DiplomeMapper diplomeMapper;
    private final AnnexeRepository annexeRepository;
    private final AnnexeMapper annexeMapper;

    public CandidatProfesseurService(CandidatRepository candidatRep, DiplomeMapper diplomeMapper, AnnexeRepository annexeRepository, AnnexeMapper annexeMapper) {
        this.candidatRep = candidatRep;
        this.diplomeMapper = diplomeMapper;
        this.annexeMapper=annexeMapper;
        this.annexeRepository=annexeRepository;
    }

    public List<CandidatProfListDto> selectCandidatsByProfesseur() {
        long userProfId = SecurityUtils.currentUserId();

        List<CandidatProfListDto> list = candidatRep.selectCandidatsListDtoByProfesseurId(userProfId);
        if (list.isEmpty()) throw new ResourceNotFoundException("La liste des candidats est vide");

        return list;
    }

    public CandidatProfDetailDto getCandidatById(long candidatId) {

        long userProfId = SecurityUtils.currentUserId();

        boolean allowed = candidatRep.existsCandidatForProf(userProfId, candidatId);
        if (!allowed) throw new ResourceNotFoundException("Vous n'avez pas accès à ce candidat");

        CandidatModel c = candidatRep.findDetailForProf(candidatId)
                .orElseThrow(() -> new ResourceNotFoundException("Candidat introuvable"));

        //  charger annexes
        List<AnnexeModel> annexes = annexeRepository.findByCandidatId(candidatId);

        // map diplomeId -> annexesDto
        Map<Long, List<AnnexeDto>> annexesDtoByDiplomeId = annexes.stream()
                .collect(Collectors.groupingBy(
                        a -> a.getDiplome().getId(),
                        Collectors.mapping(annexeMapper::toDto, Collectors.toList())
                ));

        String email = (c.getUser() != null) ? c.getUser().getUsername() : null;

        //  diplomes -> dto, puis set annexes depuis la map
        List<DiplomeDto> diplomes = (c.getDiplomes() == null) ? List.of()
                : c.getDiplomes().stream()
                .collect(Collectors.toMap(
                        d -> d.getId(),
                        d -> d,
                        (a, b) -> a,
                        LinkedHashMap::new
                ))
                .values().stream()
                .map(d -> {
                    DiplomeDto dto = diplomeMapper.toDto(d);
                    dto.setAnnexes(annexesDtoByDiplomeId.getOrDefault(d.getId(), List.of()));
                    return dto;
                })
                .toList();

        return new CandidatProfDetailDto(
                c.getCne(),
                c.getCin(),
                c.getNomCandidatArabe(),
                c.getPrenomCandidatArabe(),
                c.getAdresse(),
                email,
                c.getPathPhoto(),
                diplomes
        );
    }
    }

