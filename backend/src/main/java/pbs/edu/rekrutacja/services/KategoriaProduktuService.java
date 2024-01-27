package pbs.edu.rekrutacja.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pbs.edu.rekrutacja.models.KategoriaProduktu;
import pbs.edu.rekrutacja.repository.KategoriaProduktuRepository;

import java.util.List;

@Service
public class KategoriaProduktuService {

    private final KategoriaProduktuRepository kategoriaRepository;

    @Autowired
    public KategoriaProduktuService(KategoriaProduktuRepository kategoriaRepository) {
        this.kategoriaRepository = kategoriaRepository;
    }

    public List<KategoriaProduktu> getAllKategorie() {
        return kategoriaRepository.findAll();
    }

    public KategoriaProduktu getKategoriaById(Long id) {
        return kategoriaRepository.findById(id).orElse(null);
    }

    public KategoriaProduktu createKategoria(KategoriaProduktu kategoria) {
        return kategoriaRepository.save(kategoria);
    }

    public void deleteKategoria(Long id) {
        kategoriaRepository.deleteById(id);
    }
}
