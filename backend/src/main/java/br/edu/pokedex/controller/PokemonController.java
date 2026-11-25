package br.edu.pokedex.controller;
import java.util.List;
import br.edu.pokedex.model.Pokemon;
import br.edu.pokedex.service.PokemonService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/pokemons")
public class PokemonController {
 private final PokemonService service;
 public PokemonController(PokemonService service) { this.service=service; }
 @GetMapping public List<Pokemon> all() { return service.all(); }
 @GetMapping("/{id}") public Pokemon get(@PathVariable int id) { return service.get(id); }
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public Pokemon create(@Valid @RequestBody Pokemon p) { return service.create(p); }
 @PutMapping("/{id}") public Pokemon update(@PathVariable int id,@Valid @RequestBody Pokemon p) { return service.update(id,p); }
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable int id) { service.delete(id); }
}
