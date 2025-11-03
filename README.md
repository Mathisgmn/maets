# Maets API

Maets is an Express-based API that connects to both PostgreSQL (via Sequelize) and MongoDB (via Mongoose). The project exposes its REST routes under `/api` and can optionally serve an OpenAPI documentation UI through Swagger.

## Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL 15 (or access to a compatible instance)
- MongoDB 6 (or access to a compatible instance)
- OpenSSL (only if you want to run HTTPS locally)

> You can also run everything with Docker using the provided `docker-compose.yml` (see [Run with Docker](#run-with-docker)).

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file at the project root (or export the variables in your shell). The following variables are read by the app:

   | Variable | Description | Default |
   | --- | --- | --- |
   | `PORT` | Port for the HTTP server. | `3000` |
   | `HTTPS` | Enable HTTPS when set to `true`. | `false` |
   | `HTTPS_PORT` | HTTPS port when HTTPS is enabled. | `3443` |
   | `SSL_KEY_PATH` | Path to the SSL private key used for HTTPS. | `./certs/key.pem` |
   | `SSL_CERT_PATH` | Path to the SSL certificate used for HTTPS. | `./certs/cert.pem` |
   | `POSTGRES_HOST` | PostgreSQL host. | _required_ (no default) |
   | `POSTGRES_PORT` | PostgreSQL port. | `5432` |
   | `POSTGRES_DB` | PostgreSQL database name. | _required_ |
   | `POSTGRES_USER` | PostgreSQL user. | _required_ |
   | `POSTGRES_PASSWORD` | PostgreSQL password. | _required_ |
   | `MONGO_URI` | MongoDB connection string (should include db name or set `dbName`). | `mongodb://localhost:27017/maets` |

   > When the variables marked as “required” are missing, Sequelize cannot connect to PostgreSQL and the server will log initialization errors.

3. (Optional) Generate certificates for HTTPS. You can rely on the default `certs` directory by creating two files:

   ```bash
   mkdir -p certs
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
     -keyout certs/key.pem -out certs/cert.pem \
     -subj "/CN=localhost"
   ```

## Usage

### Development server

Start the application with hot-reload using Nodemon:

```bash
npm run dev
```

The API is available at `http://localhost:3000/api`. If Swagger documentation is enabled (the default when `docs/openapi.yaml` exists), you can browse it at `http://localhost:3000/docs`.

### Production server

Run the compiled app without Nodemon:

```bash
npm start
```

### Tests

The project uses Node's built-in test runner:

```bash
npm test
```

## Run with Docker

A ready-to-use compose stack is provided. It starts PostgreSQL, MongoDB, and the API server with HTTPS enabled (using the certificates mounted from `certs/`).

1. Ensure your `.env` file defines `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` (they are consumed by `docker-compose`).
2. Build and start the services:

   ```bash
   docker compose up --build
   ```

   The API will be available on:
   - `http://localhost:3000`
   - `https://localhost:3443`

3. To stop the stack:

   ```bash
   docker compose down
   ```

Volumes named `pgdata` and `mongodata` persist your database data between restarts.

## Project structure

- `app.js` – Express app entry point (sets up middleware, Swagger, and the HTTP/HTTPS servers).
- `config/` – Database connection configuration for PostgreSQL and MongoDB.
- `controllers/`, `services/`, `repository/`, `routers/`, `models/` – Main application logic (routes, business rules, persistence models).
- `docs/openapi.yaml` – OpenAPI specification displayed by Swagger UI.
- `tests/` – Automated test suites executed via `npm test`.

## Troubleshooting

- _PostgreSQL errors at startup_: verify the `POSTGRES_*` variables and that the database is reachable.
- _MongoDB connection failures_: update `MONGO_URI` to point to a reachable MongoDB instance.
- _HTTPS warnings_: ensure the certificate files exist at the paths configured by `SSL_KEY_PATH` and `SSL_CERT_PATH`, or disable HTTPS by setting `HTTPS=false`.

