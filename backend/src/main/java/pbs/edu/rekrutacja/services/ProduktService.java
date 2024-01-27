package pbs.edu.rekrutacja.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pbs.edu.rekrutacja.models.Produkt;
import pbs.edu.rekrutacja.repository.ProduktRepository;

import java.util.List;

@Service
public class ProduktService {

    private final ProduktRepository produktRepository;

    @Autowired
    public ProduktService(ProduktRepository produktRepository) {
        this.produktRepository = produktRepository;
    }

    public List<Produkt> getAllProdukts() {
        return produktRepository.findAll();
    }

    public Produkt getProduktById(Long id) {
        return produktRepository.findById(id).orElse(null);
    }

    public Produkt saveProdukt(Produkt produkt) {
        return produktRepository.save(produkt);
    }

    public void deleteProdukt(Long id) {
        produktRepository.deleteById(id);
    }
}
