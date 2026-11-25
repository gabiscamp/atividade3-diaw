package br.edu.pokedex.repository;
import br.edu.pokedex.model.Pokemon;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface PokemonRepository extends MongoRepository<Pokemon, Integer> {}
