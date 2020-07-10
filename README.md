## Installation

Need Docker and Docker Compose to work

```bash
$ docker-compose up -d
```

## Running the app

Need to get container bash

```bash
$ docker-compose exec app sh
```

You can run following commands inside docker container

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

