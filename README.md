# Pokédex — React, Spring Boot e MongoDB

**Autora:** Gabriela Campelo.

Pokédex da Atividade 03 integrada a uma API REST em Spring Boot com persistência no MongoDB. Permite pesquisar por nome ou número, filtrar por tipo, ver atributos e detalhes, cadastrar, editar e excluir Pokémon; também mantém favoritos, comparação, sorteio e a visualização dos treinadores.

## Pré-requisitos

- Java 17 ou superior. O Maven é baixado automaticamente pelo Wrapper incluído.
- Node.js 20.19+ ou 22.12+ e npm.
- MongoDB local em execução ou uma conta MongoDB Atlas.

## Banco de dados

Para usar um MongoDB local, inicie-o na porta 27017. Por exemplo, com Docker instalado e iniciado:

```powershell
docker run -d --name pokedex-mongo -p 27017:27017 -v pokedex-dados:/data/db mongo:7
```

O backend usa por padrão `mongodb://localhost:27017/pokedex`. Para usar o Atlas, crie um cluster, usuário de banco e libere o acesso do seu IP na configuração de rede. Copie a URI de conexão do Atlas, inclua o nome do banco após o host e configure-a no terminal **antes** de iniciar o backend:

```powershell
$env:MONGODB_URI = 'mongodb+srv://USUARIO:SENHA@SEU-CLUSTER.mongodb.net/pokedex?retryWrites=true&w=majority'
```

Substitua os valores pelos seus dados; caracteres especiais no usuário e na senha devem ser codificados para URL. Não envie a URI real ou credenciais ao GitHub. A variável acima vale apenas para o terminal atual.

Na primeira execução, caso as coleções ainda não existam, o backend cria `pokemons` e `trainers` e importa os dados de `backend/src/main/resources/seed.json`. Esse arquivo foi convertido de `Script_Pokedex.sql`, incluído na raiz: Pokémon, atributos, tipos, treinadores, insígnias e relacionamentos. A carga não é repetida quando as coleções já existem, inclusive quando estão vazias, preservando cadastros, edições e exclusões. Para recomeçar do zero, remova manualmente as coleções no MongoDB e reinicie o backend; isso apaga as alterações existentes.

## Executar

Em um terminal, na raiz do projeto:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Em outro terminal, na raiz do projeto:

```powershell
npm ci
npm run dev
```

Abra o endereço informado pelo Vite (normalmente http://localhost:5173). O Vite encaminha `/api` ao backend em `http://localhost:8080`. Mantenha MongoDB, backend e frontend em execução. Para apontar o frontend para outra API, defina `VITE_API_URL` antes de iniciar o Vite; caso use outra origem, configure CORS no servidor correspondente.

Para cadastrar, use **Cadastrar Pokémon**. Para editar ou excluir, abra os detalhes de um Pokémon. O número identifica o registro e não ? alterado na edição. Favoritos ficam no navegador; os dados dos Pokémon ficam no MongoDB.

## API

| Método | Caminho | Operação |
| --- | --- | --- |
| GET | `/api/pokemons` | Lista os Pokémon |
| GET | `/api/pokemons/{id}` | Busca pelo número |
| POST | `/api/pokemons` | Cadastra; responde 201 |
| PUT | `/api/pokemons/{id}` | Atualiza; o ID no corpo deve corresponder ao da URL |
| DELETE | `/api/pokemons/{id}` | Exclui; responde 204 |
| GET | `/api/trainers` | Lista treinadores e IDs dos seus Pokémon |

Exemplo de corpo JSON para POST ou PUT:

```json
{
  "id": 200,
  "name": "Exemplo",
  "stats": { "hp": 35, "attack": 55, "defense": 40, "specialAttack": 50, "specialDefense": 50, "speed": 90 },
  "types": [{ "id": 5, "name": "Electric" }]
}
```

ID deve ser positivo e único; nome não pode ficar vazio; atributos devem ser inteiros não negativos; informe um ou dois tipos. IDs desconhecidos retornam 404 e cadastro de ID existente retorna 409.

## Verificações

Na raiz, execute `npm run lint` e `npm run build`. No diretório `backend`, execute `.\mvnw.cmd test`.

## Organização e requisitos da atividade

O frontend React + Vite permanece na raiz (`src/`). O backend fica em `backend/`, dividido em `model`, `repository`, `service` e `controller`. A arquitetura é React → Spring Boot REST → MongoDB.

| Requisito | Implementação |
| --- | --- |
| Reutilizar a Atividade 03 | Interface existente preservada e integrada via fetch |
| Fonte SQL | `Script_Pokedex.sql` e carga convertida em `backend/src/main/resources/seed.json` |
| Spring Web e Spring Data MongoDB | Dependências em `backend/pom.xml` |
| Coleção de Pokémon | `pokemons`, com atributos e tipos embutidos |
| API REST com cinco operações | Endpoints descritos acima |
| Pesquisa, filtro, detalhes e atributos | Disponíveis na aba Pokédex |
| Cadastro, edição e exclusão pela API | Formulário de cadastro e ações nos detalhes |
| Credenciais fora do GitHub | Configuração por `MONGODB_URI` |
| Treinadores e relações (opcional) | Coleção `trainers`, com insígnias e IDs dos Pokémon |

A pesquisa por nome e o filtro por tipo são feitos no frontend sobre os dados recebidos da API. Consultas por nome ou tipo diretamente no backend são desafios opcionais e não foram implementadas.

## Roteiro de teste manual

1. Com o banco e o backend iniciados, abra `http://localhost:8080/api/pokemons` e confira a lista. Consulte também `/api/pokemons/25`.
2. No frontend, pesquise por nome ou número, filtre por tipo e abra os detalhes para conferir os seis atributos.
3. Cadastre o exemplo de número 200, recarregue a página e confira se permanece.
4. Edite esse registro pelos detalhes e recarregue para conferir a alteração.
5. Exclua o registro e recarregue para confirmar a remoção. A consulta do ID excluído deve retornar 404.
6. Confira as coleções no Atlas para verificar a persistência.

O comando `test` compila o backend, mas ainda não há testes automatizados no projeto. A compilação não substitui o roteiro manual acima.

## Entrega

Autora do projeto: Gabriela Campelo. A entrega é feita pelo link do repositório no GitHub, enviado no Canvas.
