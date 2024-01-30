package pbs.edu.rekrutacja.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pbs.edu.rekrutacja.models.Koszyk;
import pbs.edu.rekrutacja.repository.KoszykRepository;

import java.util.List;

@Service
public class KoszykService {
    private final KoszykRepository koszykRepository;

    @Autowired
    public KoszykService(KoszykRepository koszykRepository) {
        this.koszykRepository = koszykRepository;
    }

    public List<Koszyk> getAllKoszyk() {
        return koszykRepository.findAll();
    }
}
