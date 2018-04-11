# Podium Admin JavaScript SDK

This library allows you to access the Podium Admin REST API for building client applications. 

## Installation
```
npm install podium-admin-sdk
```

## Usage
```
import Podium from 'podium-admin-sdk'
let podium = new Podium(settings)

podium.Auth.login(email, password).then(rsp => {
  console.log(rsp.message)
}).catch(error => {
  console.log(error.message)
})
``` 
