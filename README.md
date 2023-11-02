## Urban Sky Fullstack Take Home Exercise

### Run with Docker Compose
```
docker-compose up --build
```

### Running locally
This application requires a Postgres installation with a db `urban_sky` created:
```
// bash
sudo -u postgres psql
create db urban_sky;
```

#### Run migrations
```
cd server

PGUSER=postgres \
PGHOST=localhost \
PGPASSWORD=postgres \
PGDATABASE=urban_sky \
PGPORT=5432 \
npm run migrate
```

#### Run server locally 
```
cd server
npm install

PGUSER=postgres \
PGHOST=localhost \
PGPASSWORD=postgres \
PGDATABASE=urban_sky \
PGPORT=5432 \
npm start
```

#### Run client locally 
```
cd client
npm install
npm run dev
```

The frontend client application is now available at http://localhost:5173/.
