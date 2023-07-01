# Demo Remitano Application
## Install / Build Project

### From root project, run below code, because I init project with yarn workspace, so we only run yarn install from root.
```
  # From root project
  yarn install
```

## Backend project
Before running the project backend, please copy the **.env.example** file on backend root folder and rename the file to **.env** so that the project can map information from the .env file to map to the system's enviroment variables, after run code below
```
  cd packages/backend
```
* Run localhost
```
yarn dev
```
* Build localhost && start prod
```
yarn build && yarn start
```

## Frontend project
Before running the project backend, please copy the **.env.example** file on backend root folder and rename the file to **.env** so that the project can map information from the .env file to map to the system's enviroment variables, after run code below
```
  cd packages/frontend
```
* Run localhost
```
yarn dev
```
* Build localhost && start prod
```
yarn prod
```
# Authentication with Register
![alt text](https://github.com/dohongsang/demo-remi/blob/main/register-flow-diagram.png?raw=true)

Frontend will provide UI/UX so that user can input information like <First Name> <Last Name> <Email> <Password>. Here the password is encrypted with Cryptojs with the Hash Key stored in the env in the pods in the container. And the Hash Key in FE and BE is the same, because BE needs to decrypt the password sent from Frontend.

After decrypting the password from the frontend, the backend will encrypt the decrypted password with the generated hash key.

The server will use encrypted password information and hash key to store data in the user account
# Authentication with Login
![alt text](https://github.com/dohongsang/demo-remi/blob/main/login-flow-diagram.png?raw=true)

Frontend will provide UI/UX so that user can input information like <Email> <Password>. Here the password is encrypted with Cryptojs with the Hash Key stored in the env in the pods in the container.

The server will get the password information sent from the client to decrypt to get the real password. And will use this password to compare with the decrypted password from the backend

The server will get the account information sent from the Frontend by email, to get the corresponding account including the hash key and hash password. The server will use the hash key to decrypt the password hash and compare it with the password from the client
