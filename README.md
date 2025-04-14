# 🏥 API de Procedimentos Médicos

Esta API foi desenvolvida para facilitar o gerenciamento de procedimentos médicos, previsões de pagamento e controle de glosas em clínicas e hospitais.

Este projeto faz parte de um teste técnico com o objetivo de avaliar conhecimentos em desenvolvimento backend.

## 📚 Funcionalidades

- Cadastro de procedimentos médicos.
- Relatório diário de procedimentos por médico.
- Relatório de glosas por período.
- Relatório financeiro por médico.

## 🚀 Tecnologias

- **Backend**: Node.js, NestJS, TypeScript
- **Banco de dados**: PostgreSQL, Prisma ORM
- **Testes**: Jest
- **Documentação**: Swagger
- Docker

## 🐳 Rodando o projeto com Docker

Para facilitar a configuração do ambiente, tudo já está pronto para subir com Docker!

### Pré-requisitos

- Docker instalado (Docker Engine + Docker Compose)

### Comandos para rodar o projeto

1. Clone o repositório

```bash
git clone https://github.com/ianasampaio/medical-procedures-api.git
```

2. Acesse a pasta

```bash
cd medical-procedures-api
```

3. Suba os containers

```bash
docker-compose up --build
```

Isso irá:

- Subir o banco de dados PostgreSQL

- Rodar as migrations do Prisma

- Executar o script de seed para popular dados iniciais

- Iniciar a aplicação NestJS

## 📑 Documentação Swagger

A documentação da API está disponível em:

```bash
http://localhost:3000/api
```

## ⚠️ Tratamento de Erros e Exceções

A API utiliza os mecanismos nativos do **NestJS** para lidar com erros e exceções, garantindo respostas consistentes e claras para o cliente.

- **Validation Errors**:
  Ao receber dados em `DTOs`, usamos **class-validator** para validar campos (ex: campos obrigatórios, formatos corretos, valores permitidos). Se houver erro, o NestJS automaticamente retorna um `400 Bad Request` com a descrição dos problemas.
- **Business Errors**:
  Para regras de negócio, usamos exceções específicas como:
  - `BadRequestException`: para dados inválidos (ex: startDate > endDate).
  - `NotFoundException`: para recursos não encontrados (ex: Doctor not found).
    Essas exceções são lançadas no **service layer**, e o NestJS encapsula e envia para o cliente no formato correto.
- **Internal Server Errors**:
  Qualquer erro inesperado que aconteça na aplicação (como falha no banco) será tratado por meio do `Exception Filters` padrão do NestJS, retornando um `500 Internal Server Error` controlado.

## 🔒 Segurança dos Dados

A API adota boas práticas de segurança para proteger os dados dos usuários:

- **Validação de Entrada**:
  Todos os dados recebidos dos clientes passam por validações para evitar ataques como SQL Injection e envio de payloads maliciosos.
- **Tratamento de Erros Seguro**:
  A API não expõe informações sensíveis nos erros. Mensagens genéricas são retornadas ao cliente.
- **Uso do Prisma**:
  Prisma ORM previne injeções SQL por padrão, pois todas as queries são parametrizadas.

## 🧪 Testes Unitários

Esta API conta com testes unitários implementados nos services, utilizando Jest como framework de testes.

Para rodar os testes, utilize o comando:

```bash
npm run test
```

## 🧑‍💻 Sobre o desenvolvimento

Durante o desenvolvimento, busquei criar uma base sólida que pudesse ser facilmente evoluída futuramente — como a adição de autenticação, autorização de usuários, ou novos relatórios.
