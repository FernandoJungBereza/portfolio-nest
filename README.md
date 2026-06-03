# Portfolio Nest

API REST em [NestJS](https://nestjs.com/) para alimentar o portfólio pessoal (`my-portfolio`), seguindo a mesma base do projeto [to-do-nest](https://github.com/FernandoJungBereza/to-do-nest): TypeORM, PostgreSQL, validação, Swagger em desenvolvimento, alias `@/*` e scripts de migration/seed.

## Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | NestJS 11 |
| Linguagem | TypeScript |
| Banco | PostgreSQL 16 (TypeORM) |
| Validação | class-validator / class-transformer |
| Docs | Swagger (`@nestjs/swagger`) |

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/portfolio` | Conteúdo completo (hero, sobre, projetos, skills, contato…) |
| GET | `/portfolio/:slug` | Mesmo payload por slug (`default`) |

## Início rápido

```bash
cp .sample.env .env
docker compose up -d
npm install
npm run seed
npm run start:dev
```

- API: `http://localhost:3001`
- Swagger (dev): `http://localhost:3001/api`
- pgAdmin: `http://localhost:8086` (admin@admin.com / admin123)

## Seed a partir do front

Quando alterar os `consts` do `my-portfolio`:

```bash
cd ../my-portfolio
npx tsx scripts/export-to-portfolio-api.ts
cd ../portfolio-nest
npm run seed
```

Isso regenera `src/database/seeds/portfolio.default-payload.json` com os dados atuais do front (projetos, skills, decorações do bento, etc.).

## Variáveis de ambiente

Ver `.sample.env`. A porta padrão é **3001** e o Postgres usa **5433** no host para não conflitar com o `to-do-nest`.

## Estrutura

```
src/
  config/          # env, typeorm, swagger
  database/        # datasource, seeds
  modules/portfolio/
    entities/
    repositories/  # abstract + implementação
    use-cases/
    dtos/
```

## Próximos passos (opcional)

- Endpoints admin (CRUD) com autenticação
- Normalizar JSON em tabelas por seção
- Integrar `my-portfolio` consumindo `GET /portfolio`
