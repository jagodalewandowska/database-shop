package pbs.edu.rekrutacja.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pbs.edu.rekrutacja.models.Producent;
import pbs.edu.rekrutacja.repository.ProducentRepository;

import java.util.List;

@Service
public class ProducentService {

    private final ProducentRepository producentRepository;

    @Autowired
    public ProducentService(ProducentRepository producentRepository) {
        this.producentRepository = producentRepository;
    }

    public List<Producent> getAllProducents() {
        return producentRepository.findAll();
    }

    public Producent getProducentById(Long id) {
        return producentRepository.findById(id).orElse(null);
    }

    public Producent saveProducent(Producent producent) {
        return producentRepository.save(producent);
    }

    public void deleteProducent(Long id) {
        producentRepository.deleteById(id);
    }
}

