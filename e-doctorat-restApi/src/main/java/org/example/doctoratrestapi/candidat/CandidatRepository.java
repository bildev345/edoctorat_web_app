package org.example.doctoratrestapi.candidat;

import org.example.doctoratrestapi.dtos.professeur.CandidatProfListDto;
import org.example.doctoratrestapi.models.CandidatModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CandidatRepository extends JpaRepository<CandidatModel, Long> {
    public CandidatModel searchCandidatByNomCandidatArabe(String nomAr);
    public CandidatModel getCandidatById(Long id);
    @Query("select p.candidatModel from PostulerModel p join p.sujetModel s join s.professeur pr where pr.user.id = :userProfesseurId")
    List<CandidatModel> selectCandidatsByProfesseurId(@Param("userProfesseurId") long userProfesseurId);

    @Query("""
select distinct p.candidatModel
from PostulerModel p
join p.sujetModel s
join s.professeur pr
join pr.laboratoire l
where l.directeur.user.id = :directeurLaboUserId
""")
    List<CandidatModel> selectCandidatsByDirecteurLaboId(@Param("directeurLaboUserId") Long directeurLaboUserId);


    // getCandidatById(id) permet à un prof d’ouvrir un candidat même si ce candidat n’a jamais postulé à ses sujets. hafssa
   @Query("""
select count(p) > 0 from PostulerModel p 
join p.sujetModel s 
join s.professeur pr 
where pr.user.id = :userProfUserId and p.candidatModel.id = :candidatId
""")
   boolean existsCandidatForProf(@Param("userProfUserId") long userProfUserId,
                                 @Param("candidatId") long candidatId);


    @Query("""
select distinct new org.example.doctoratrestapi.dtos.professeur.CandidatProfListDto(
    c.id,
    c.cne,
    c.nomCandidatArabe,
    c.prenomCandidatArabe,
    s.titre
)
from PostulerModel p
join p.candidatModel c
join p.sujetModel s
join s.professeur pr
where pr.user.id = :userProfesseurId
""")
    List<CandidatProfListDto> selectCandidatsListDtoByProfesseurId(@Param("userProfesseurId") long userProfesseurId);


    @Query("""
select distinct c
from CandidatModel c
left join fetch c.user u
left join fetch c.diplomes d
left join fetch d.annexes a
where c.id = :candidatId
""")
    Optional<CandidatModel> findDetailForProf(@Param("candidatId") long candidatId);


    Optional<CandidatModel> findByUser_Username(String username);
}
