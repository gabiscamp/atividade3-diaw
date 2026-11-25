package br.edu.pokedex.service;
import java.util.List;
import br.edu.pokedex.model.*;
import br.edu.pokedex.repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;
@Component
public class SeedData implements CommandLineRunner {
 private final MongoTemplate mongo; private final PokemonRepository pokemons; private final TrainerRepository trainers; private final ObjectMapper mapper;
 public SeedData(MongoTemplate mongo, PokemonRepository pokemons, TrainerRepository trainers, ObjectMapper mapper) { this.mongo=mongo; this.pokemons=pokemons; this.trainers=trainers; this.mapper=mapper; }
 record Seed(List<Pokemon> pokemon, List<Trainer> trainers) {}
 @Override public void run(String... args) throws Exception {
  Seed seed=mapper.readValue(new ClassPathResource("seed.json").getInputStream(), Seed.class);
  if (!mongo.collectionExists("pokemons")) pokemons.saveAll(seed.pokemon());
  if (!mongo.collectionExists("trainers")) trainers.saveAll(seed.trainers());
 }
}
