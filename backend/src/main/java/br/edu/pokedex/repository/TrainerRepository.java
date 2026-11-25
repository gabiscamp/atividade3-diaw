package br.edu.pokedex.repository;
import br.edu.pokedex.model.Trainer;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface TrainerRepository extends MongoRepository<Trainer, Integer> {}
