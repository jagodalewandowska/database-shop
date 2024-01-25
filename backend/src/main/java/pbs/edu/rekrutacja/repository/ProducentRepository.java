package pbs.edu.rekrutacja.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pbs.edu.rekrutacja.models.Producent;

@Repository
public interface ProducentRepository extends JpaRepository<Producent, Long> {
}


