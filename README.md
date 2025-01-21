# E-commerce API with Express and Prisma

This project is an e-commerce API built with Express.js and Prisma ORM. It provides endpoints for managing products and orders with efficient data retrieval and storage.

The API is designed to handle product listings and order creation. It utilizes a PostgreSQL database for persistent storage.

## Repository Structure

```
.
├── build.ts
├── docker-compose.yml
├── package.json
├── pnpm-lock.yaml
├── prisma
│   └── schema.prisma
├── src
│   ├── app.ts
│   ├── controllers
│   │   ├── order.controller.ts
│   │   └── product.controller.ts
│   ├── middlewares
│   │   ├── error.middlewares.ts
│   │   └── log.middlewares.ts
│   ├── routes
│   │   ├── order.routes.ts
│   │   └── product.routes.ts
│   ├── schemas
│   │   └── order.schema.ts
│   ├── server.ts
│   ├── services
│   │   └── order.service.ts
│   ├── tests
│   │   ├── order.service.test.ts
│   │   ├── order.test.ts
│   │   └── products.test.ts
│   └── utils
│       ├── constants.utils.ts
│       ├── error.utils.ts
│       ├── fetch.utils.ts
│       └── types.utils.ts
└── vitest.config.ts
```

### Key Files:

- `src/app.ts`: Main application setup
- `src/server.ts`: Server initialization and graceful shutdown
- `src/controllers/`: Request handlers for different routes
- `src/routes/`: API route definitions
- `src/services/`: Business logic implementation
- `src/middlewares/`: Custom middleware functions
- `src/utils/`: Utility functions and constants
- `src/tests/`: Unit and integration tests
- `docker-compose.yml`: Docker configuration for PostgreSQL database
- `vitest.config.ts`: Vitest configuration for running tests

## Usage Instructions

### Prerequisites

- Node.js (v18.18 or later)
- pnpm (v7 or later)
- Docker and Docker Compose

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Start the PostgreSQL database using Docker:
   ```
   docker-compose up -d
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   DATABASE_URL="postgresql://ecomapp:ecomapp123@localhost:5432/mydb?schema=public"
   PORT=8080
   ```

5. Run database migrations:
   ```
   pnpm prisma migrate dev
   ```

6. Build the project:
   ```
   pnpm build
   ```

7. Start the server:
   ```
   pnpm start
   ```

For development, you can use the following command to run the server with hot-reloading:
```
pnpm dev
```

### API Endpoints

- `GET /products`: Fetch paginated list of products
- `POST /order`: Create a new order

### Testing

Run the test suite using:

```
pnpm test
```

To run tests in watch mode:

```
pnpm test:watch
```

To check for TypeScript errors without emitting files:

```
pnpm lint
```

## Docker Usage

To build and run the e-commerce API using Docker, follow these steps:

1. Build the Docker image:
   ```
   docker build -t ecom-api .
   ```

2. Run the Docker container:
   ```
   docker run --env-file .env -p 8080:8080 ecom-api
   ```

This command does the following:
- Uses the `.env` file for environment variables
- Maps port 8080 of the container to port 8080 on your host machine
- Uses the `ecom-api` image we built in step 1

Make sure your `.env` file is properly configured before running the Docker container.

### Troubleshooting

1. Database Connection Issues:
   - Problem: Unable to connect to the PostgreSQL database
   - Solution: 
     1. Ensure Docker is running and the PostgreSQL container is up
     2. Check the `DATABASE_URL` in your `.env` file
     3. Verify network settings if running in a containerized environment

2. Test Failures:
   - Problem: Unit or integration tests are failing
   - Solution:
     1. Ensure all dependencies are installed: `pnpm install`
     2. Check if the database is running and accessible
     3. Verify that environment variables are set correctly
     4. Run tests in isolation: `pnpm test <test-file-name>`

## Data Flow

The application follows this general data flow for handling requests:

1. Client sends a request to an API endpoint
2. Express router directs the request to the appropriate controller
3. Controller validates input and calls the relevant service
4. Service interacts with the database (via Prisma) or external API
5. Response is sent back to the client

```
Client -> Express Router -> Controller -> Service -> Database -> Service -> Controller -> Client
```

## Infrastructure

The project uses Docker Compose to set up a PostgreSQL database:

- PostgreSQL:
  - Image: postgres
  - Container Name: my_postgres
  - Environment Variables:
    - POSTGRES_USER: ecomapp
    - POSTGRES_PASSWORD: ecomapp123
    - POSTGRES_DB: mydb
  - Port: 5432 (exposed)
  - Volume: postgres_data (for data persistence)

The server is configured to run on the port specified in the environment variables (default: 8000).
