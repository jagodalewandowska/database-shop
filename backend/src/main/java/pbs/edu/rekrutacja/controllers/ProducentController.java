package pbs.edu.rekrutacja.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pbs.edu.rekrutacja.models.ERole;
import pbs.edu.rekrutacja.models.Producent;
import pbs.edu.rekrutacja.models.Role;
import pbs.edu.rekrutacja.models.User;
import pbs.edu.rekrutacja.services.ProducentService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @PutMapping("/{producent_id}")
    public Producent updateProducent(@PathVariable Long producent_id, @RequestBody Producent producent) {
        Producent existingProducent = producentService.getProducentById(producent_id);
        return producentService.updateProducent(producent_id, producent);
    }


    @DeleteMapping("/{id}")
    public void deleteProducent(@PathVariable Long id) {
        producentService.deleteProducent(id);
    }
}

