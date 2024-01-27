package pbs.edu.rekrutacja.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pbs.edu.rekrutacja.models.Zamowienia;
import pbs.edu.rekrutacja.repository.ZamowieniaRepository;

import java.util.List;

@Service
public class ZamowieniaService {

    private final ZamowieniaRepository zamowieniaRepository;

    @Autowired
    public ZamowieniaService(ZamowieniaRepository zamowieniaRepository) {
        this.zamowieniaRepository = zamowieniaRepository;
    }

    public List<Zamowienia> getAllZamowienia() {
        return zamowieniaRepository.findAll();
    }

    public Zamowienia getZamowienieById(Integer id) {
        return zamowieniaRepository.findById(id).orElse(null);
    }

    public void addZamowienie(Zamowienia zamowienie) {
        zamowieniaRepository.save(zamowienie);
    }

    public void updateZamowienie(Integer id, Zamowienia zamowienie) {
        if (zamowieniaRepository.existsById(id)) {
            zamowienie.setIdZam(id);
            zamowieniaRepository.save(zamowienie);
        }
    }

    public void deleteZamowienie(Integer id) {
        zamowieniaRepository.deleteById(id);
    }
}
