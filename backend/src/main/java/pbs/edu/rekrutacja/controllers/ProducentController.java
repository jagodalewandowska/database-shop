package pbs.edu.rekrutacja.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pbs.edu.rekrutacja.models.Producent;
import pbs.edu.rekrutacja.services.ProducentService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/producents")
public class ProducentController {

    private final ProducentService producentService;

    @Autowired
    public ProducentController(ProducentService producentService) {
        this.producentService = producentService;
    }

    @GetMapping
    public List<Producent> getAllProducents() {
        return producentService.getAllProducents();
    }

    @GetMapping("/{id}")
    public Producent getProducentById(@PathVariable Long id) {
        return producentService.getProducentById(id);
    }

    @PostMapping
    public Producent saveProducent(@RequestBody Producent producent) {
        return producentService.saveProducent(producent);
    }

    @DeleteMapping("/{id}")
    public void deleteProducent(@PathVariable Long id) {
        producentService.deleteProducent(id);
    }
}

