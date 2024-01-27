package pbs.edu.rekrutacja.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import pbs.edu.rekrutacja.models.Producent;
import pbs.edu.rekrutacja.models.User;
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


    public Producent updateProducent(Long producent_id, Producent producent) {
        Producent exisitingProducent = getProducentById(producent_id);
        exisitingProducent.setNazwa(producent.getNazwa());
        try {
            return producentRepository.save(exisitingProducent);
        } catch (DataAccessException e) {
            System.out.println("Error updating producent: " + e.getMessage());
        }

        return exisitingProducent;
    }
    public void deleteProducent(Long id) {
        producentRepository.deleteById(id);
    }
}

