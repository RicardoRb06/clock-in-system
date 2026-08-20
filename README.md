# Sistema de ponto IFNITE

<p align="center"> <img width="250" alt="Logo IFNITE" src="https://github.com/user-attachments/assets/d39c3ed9-466f-4402-af65-596cbc5e34bb" /> </p>

<p align="center"> API de registro de ponto e gerenciamento de atividades da equipe de robótica <b>IFNITE</b><br/> IF Sudeste MG — Campus Juiz de Fora </p>

<p align="center"> <a href="https://www.instagram.com/ifnite_/"> <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white"/> </a> </p>

## Descrição
O Sistema de Ponto IFNITE é uma API desenvolvida para gerenciar o registro de presença dos membros da equipe de robótica IFNITE.

A aplicação permite:

- Registro de entrada 
- Registro de saída 
- Autenticação segura com JWT
- Controle de usuários

## Tecnologias
- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- JWT
- Zod
- Vitest
- pnpm


## Arquitetura
O projeto segue o padrão de arquitetura de camadas

src/ <br>
├── controllers <br>
├── services <br>
├── repositories <br>
├── middlewares<br>
├── dto

## Como rodar o projeto

1. Clone o repositório
```
git clone https://github.com/RicardoRb06/clock-in-system.git
cd clock-in-system
```
2. Instale as dependências
```
pnpm install
```
3. Crie um arquivo `.env` na raiz do projeto
```
DATABASE_URL=""
JWT_SECRET=""
```
4. Execute as migrations
```
pnpm prisma migrate dev
```
5. Gere o client do Prisma
```
pnpm prisma migrate dev
```
6. Inicie o servidor
```
pnpm dev
```
## Endpoints
- POST auth/register
- POST auth/login
- POST time-entry/clock-in
- POST time-entry/clock-out
