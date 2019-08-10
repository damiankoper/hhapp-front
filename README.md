[![Build Status](https://travis-ci.org/damiankoper/hhapp-front.svg?branch=master)](https://travis-ci.org/damiankoper/hhapp-front.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/damiankoper/hhapp-front/badge.svg?branch=master)](https://coveralls.io/github/damiankoper/hhapp-front?branch=master)
# HouseholdApp Front

Set on 
* Docker@19.03.1
* DockerCompose@1.24.1

### Run for development
```
docker-compose up
```

### Run for production
Config:
* Server: nginx
* Port: 80
```
docker-compose -f docker-compose.prod.yml up -d
```