package pbs.edu.rekrutacja.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pbs.edu.rekrutacja.models.Produkt;

@Repository
public interface ProduktRepository extends JpaRepository<Produkt, Long> {

}
