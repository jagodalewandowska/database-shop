package pbs.edu.rekrutacja.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pbs.edu.rekrutacja.models.Zamowienia;

public interface ZamowieniaRepository extends JpaRepository<Zamowienia, Integer> {
}
