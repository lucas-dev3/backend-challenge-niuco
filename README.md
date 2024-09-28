
# Api Niuco SaaS integration

O projeto consiste na criação de uma aplicação de integração com a API de um SaaS, responsável por coletar e processar dados de usuários cadastrados. A aplicação terá como objetivo extrair informações de usuários, aplicar transformações conforme regras específicas e exibir os dados de forma consolidada.


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`PORT=3000`

`API_MOCK_URL=http://jsonserver`


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/lucas-dev3/backend-challenge-niuco.git
```

Entre no diretório do projeto

```bash
  cd backend-challenge-niuco
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```


## Rodando com Docker

Clone o projeto

```bash
  git clone https://github.com/lucas-dev3/backend-challenge-niuco.git
```

Entre no diretório do projeto

```bash
  cd backend-challenge-niuco
```

Inicie o serviço

```bash
  docker compose up --build
```


## Documentação
[Documentação Swagger](http://localhost:3000/api-docs)


## Rodando os testes

Para rodar os testes, rode o seguinte comando. Se for rodar localmente.

```bash
  npm run test
```

## Stack Utilizada

### Back-end
- **Node.js**: Ambiente de execução para JavaScript no lado do servidor, proporcionando alta performance e escalabilidade.
- **NestJS**: Framework progressivo para construir aplicações eficientes e escaláveis em Node.js, utilizando TypeScript.
- **json-server**: Ferramenta que permite criar uma API RESTful rápida e fácil para desenvolvimento e testes.
- **Docker**: Plataforma para desenvolver, enviar e executar aplicações em contêineres, garantindo consistência entre ambientes.
- **CI/CD**: Integração Contínua e Entrega Contínua para automação de testes e deploys, garantindo a qualidade e a rapidez nas entregas.
