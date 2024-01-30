package pbs.edu.rekrutacja.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pbs.edu.rekrutacja.models.Koszyk;

import java.util.List;

public interface KoszykRepository extends JpaRepository<Koszyk, Integer> {
}

