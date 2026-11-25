package br.edu.pokedex.controller;
import java.util.List;
import br.edu.pokedex.model.Trainer;
import br.edu.pokedex.repository.TrainerRepository;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/trainers")
public class TrainerController {
 private final TrainerRepository repository;
 public TrainerController(TrainerRepository repository) { this.repository=repository; }
 @GetMapping public List<Trainer> all() { return repository.findAll(); }
}
