package br.edu.pokedex.service;
import java.util.List;
import br.edu.pokedex.model.Pokemon;
import br.edu.pokedex.repository.PokemonRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.dao.DuplicateKeyException;
@Service
public class PokemonService {
 private final PokemonRepository repo;
 public PokemonService(PokemonRepository repo) { this.repo=repo; }
 public List<Pokemon> all() { return repo.findAll(); }
 public Pokemon get(int id) { return repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Pokémon não encontrado")); }
 public Pokemon create(Pokemon p) { try { return repo.insert(p); } catch (DuplicateKeyException e) { throw new ResponseStatusException(HttpStatus.CONFLICT,"Já existe um Pokémon com este número"); } }
 public Pokemon update(int id, Pokemon p) { get(id); if (!p.id().equals(id)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"O número não pode ser alterado"); return repo.save(p); }
 public void delete(int id) { get(id); repo.deleteById(id); }
}
