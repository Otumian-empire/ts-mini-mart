# Documentation

All effort has been made to prevent errors/bugs/typos. Kindly send an email to the author (Check the `package.json author`)

## Entity

Entities are just the tables used. Look into `src/db/entity` to review the Entities (Table structure).

- User -> consumer
- Cart -> cart
- Product -> product
- Checkout -> checkout

## How It Works

Import `ts-mini-mart.postman_collection.json` into postman

- Create Products for the Fake Mini Mart
- Create a user account
- User adds Product of interest to Cart
- User Checkouts Cart

## How To Contribute

- Create an issue (?for discussion).
- Fork or clone, `git clone https://github.com/Otumian-empire/ts-mini-mart.git`
- Make changes
- Add yourself to the authors in `AUTHORS.md` or create `AUTHORS.md` in the root folder where `package.json` is
- Get the latest update
- Send PR (?Maximum of 2 commits, squash it)

## How To Setup

- Create a `.env` file in the root folder, where `package.json` is.
- Put the database configurations in the `.env` file as done in `sample.env`.
- Create a database with the name `ts_mini_mart_db` or as directed/passed in the `.env` file.
- Run `psql` on terminal to open the `psql` in interactive environment or console.
- Run `CREATE DATABASE ts_mini_mart_db`, to create the database. (Use the name of the database passed in the `.env` file)
- Run database synchronization, `npm run sync-db`.
- Run husky setup (for pre-commit hook), `npm run prepare`. Add `npm run check-format && npm run check-lint` at the end of `.husky/pre-commit` in the root directory. (During/after development, after a commit, the pre-commit hook will be executed and when it fails run, `npm run format && npm run lint` or `fix-all`. Remember to `add and then commit` afterwards.)
- Run server in development mode, `npm run dev`.

## Assumptions/Conversions

- For a request that writes to the database, the (`ID` of the) item should be passed in the request body but not in the request parameter.
- For a request that writes to the database, if the (`ID` of the) item depends on another, say `Cart` depends on `User`, and we wish to delete `Cart`, pass `User` in the request body and pass `Cart` in the request parameter.
- Use `.env` over `ormconfig.[ts, js, env, json]`. We can easily add our `ENVIRONMENTAL VARIABLES`.

## Warning

Eslint warns of indentation space, expects 4 but saw 2. So I commented out `"indent": ["error", 2],` from the `.eslintrc.json` file.

## Tools/System/Packages Used

- [Typescript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)
- [vscode](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/)
- [Eslint](https://eslint.org/) & [Prettier](https://prettier.io/)
