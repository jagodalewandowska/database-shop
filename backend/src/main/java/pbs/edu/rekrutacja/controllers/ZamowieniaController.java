package pbs.edu.rekrutacja.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pbs.edu.rekrutacja.models.Zamowienia;
import pbs.edu.rekrutacja.services.ZamowieniaService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/zamowienia")
public class ZamowieniaController {

    private final ZamowieniaService zamowieniaService;

    @Autowired
    public ZamowieniaController(ZamowieniaService zamowieniaService) {
        this.zamowieniaService = zamowieniaService;
    }

    @GetMapping
    public List<Zamowienia> getAllZamowienia() {
        return zamowieniaService.getAllZamowienia();
    }

    @GetMapping("/{id}")
    public Zamowienia getZamowienieById(@PathVariable Integer id) {
        return zamowieniaService.getZamowienieById(id);
    }

    @PostMapping
    public void addZamowienie(@RequestBody Zamowienia zamowienie) {
        zamowieniaService.addZamowienie(zamowienie);
    }

    @PutMapping("/{id}")
    public void updateZamowienie(@PathVariable Integer id, @RequestBody Zamowienia zamowienie) {
        zamowieniaService.updateZamowienie(id, zamowienie);
    }

    @DeleteMapping("/{id}")
    public void deleteZamowienie(@PathVariable Integer id) {
        zamowieniaService.deleteZamowienie(id);
    }
}
