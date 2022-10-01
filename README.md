## Getting Started

# First, install packages:

```bash
pnpm install
```

# Second, run dev server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Run tests

```bash
pnpm db-test
```

# View database

```bash
dotenv -e .env.local -- pnpm studio
```

# Run migrations

Local for testing
1. ensure local db is online
```bash
sudo docker run --name=mysql --restart on-failure -d -p 3308:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=stea_test mysql/mysql-server:latest
```

docker
```bash
pnpm migrate-local
```

Cloud (Pushes schema to planetscale db)
```bash
pnpm push
```

# Analyze build

```bash
ANALYZE=true pnpm build
```

# Pushing commits to GH causes vercel to start a preview build
