package com.epn.odontologia.odontograma.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.epn.odontologia.odontograma.models.Odontograma;
import java.util.List;

@Repository
public interface OdontogramaRepository extends JpaRepository<Odontograma, Long> {
    List<Odontograma> findByFichaId(Long fichaId);
}
