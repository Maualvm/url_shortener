# How to run this project

## Create `.env` file
Copy the `.env.example` file, rename it to `.env` and specify your own JWT secret.

## Run MongoDB

```bash
docker-compose up -d
```

## Run the project
```bash
npm run start
```

# Usage

Call the endpoints using the provided Postman collection.

## Endpoints
- `/signup` - Register a new user in the DB with email and password
- `/login` - Login the user with email and password
- `/encode`  - Encodes a URL to a shortened URL. This URL must be private and only accessible once the user is logged in
- `/decode` - Decodes a shortened URL to its original URL. This URL must be private and only accessible once the user is logged in


