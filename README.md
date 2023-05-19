# Fruit Merkat
Fruit Merkat is simple porject with CRUD fruit items functions for fruit Merkat to track the price of each one through a Web App. This project combines a REST API, an Apollo GraphQL server, and a UI client, all working together to provide a secure authentication solution. The server-side implements GitHub authentication for clients, allowing users to authenticate using their GitHub accounts.

## Features
Secure authentication with GitHub

RESTful API for data exchange

Apollo GraphQL server for efficient data querying

UI client powered by Apollo client

Deployable with Docker Compose

Prerequisites


Before running the project, make sure you have the following software installed:


## Install Docker Compose

You can install Docker Compose with following guide.

[Install guide](https://docs.docker.com/compose/install/)

Verify the version installed with the following command.

```shell
docker-compose --version
```


## Config the following envs

```shell
Edit env API

PORT=4001
DB_URL= (MONGO DB)
```

```shell
Edit env server

PORT=4000
JWT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
API_PORT=
HOME_UI=
API_PROVIDER_URL=
```

```shell
Edit env UI

NEXT_PUBLIC_APOLLO_SERVER_URL=http://localhost:4000
```


## Run project

Run the following command.

```shell
sudo docker compose up -d
```


## Stop project

Run the following command.

```shell
sudo docker compose stop
```


## Access to UI app

You can acces the apps with the following links.

[UI](http://localhost:3000/)



## License
It's free