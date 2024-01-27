package pbs.edu.rekrutacja.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pbs.edu.rekrutacja.models.KategoriaProduktu;
import pbs.edu.rekrutacja.services.KategoriaProduktuService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/categories")
public class KategoriaProduktuController {

    private final KategoriaProduktuService kategoriaService;

    @Autowired
    public KategoriaProduktuController(KategoriaProduktuService kategoriaService) {
        this.kategoriaService = kategoriaService;
    }

    @GetMapping
    public ResponseEntity<List<KategoriaProduktu>> getAllKategorie() {
        List<KategoriaProduktu> kategorie = kategoriaService.getAllKategorie();
        return new ResponseEntity<>(kategorie, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<KategoriaProduktu> getKategoriaById(@PathVariable Long id) {
        KategoriaProduktu kategoria = kategoriaService.getKategoriaById(id);
        return new ResponseEntity<>(kategoria, kategoria != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<KategoriaProduktu> createKategoria(@RequestBody KategoriaProduktu kategoria) {
        KategoriaProduktu createdKategoria = kategoriaService.createKategoria(kategoria);
        return new ResponseEntity<>(createdKategoria, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKategoria(@PathVariable Long id) {
        kategoriaService.deleteKategoria(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
