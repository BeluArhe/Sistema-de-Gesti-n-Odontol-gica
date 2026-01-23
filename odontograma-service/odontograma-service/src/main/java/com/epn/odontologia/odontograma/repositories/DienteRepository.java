package com.epn.odontologia.odontograma.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.epn.odontologia.odontograma.models.Diente;
import java.util.List;

@Repository
public interface DienteRepository extends JpaRepository<Diente, Long> {
    List<Diente> findByOdontogramaId(Long odontogramaId);
}
