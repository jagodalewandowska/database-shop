package pbs.edu.rekrutacja.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pbs.edu.rekrutacja.models.Koszyk;
import pbs.edu.rekrutacja.services.KoszykService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/koszyk")
public class KoszykController {
    private final KoszykService koszykService;

    @Autowired
    public KoszykController(KoszykService koszykService) {
        this.koszykService = koszykService;
    }

    @GetMapping("/all")
    public List<Koszyk> getAllKoszyk() {
        return koszykService.getAllKoszyk();
    }
}
