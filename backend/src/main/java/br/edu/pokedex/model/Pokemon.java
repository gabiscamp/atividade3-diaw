package br.edu.pokedex.model;
import java.util.List;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "pokemons")
public record Pokemon(@Id @NotNull @Positive Integer id, @NotBlank @Size(max=100) String name,
                      @NotNull @Valid Stats stats, @NotEmpty @Size(max=2) List<@NotNull @Valid PokemonType> types) {
 public record Stats(@NotNull @Min(0) Integer hp, @NotNull @Min(0) Integer attack, @NotNull @Min(0) Integer defense,
                     @NotNull @Min(0) Integer specialAttack, @NotNull @Min(0) Integer specialDefense, @NotNull @Min(0) Integer speed) {}
 public record PokemonType(@NotNull @Min(0) Integer id, @NotBlank String name) {}
}
