# Listly

Listly is a versatile web application designed to help users efficiently create, organize, and manage their tasks. With its user-friendly interface, Listly allows users to set up task lists, prioritize items and track progress.


## Demo

https://listly-todo.netlify.app/

## Screenshots

![Sign up](https://i.postimg.cc/RZ0nJ4Gp/Listly-Screenshot-1.png)

![Sign in](https://i.postimg.cc/PqgL7ZH0/Listly-Screenshot-2.png)

![Create your task](https://i.postimg.cc/nhCBwBgG/screencapture-listly-todo-netlify-app-2024-07-26-16-44-22.png)

![Task created](https://i.postimg.cc/pdhhkCwD/Listly-Screenshot-3.png)

![Edit your task](https://i.postimg.cc/k4WVP4XG/Listly-Screenshot-4.png)


## Tech Stack

- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database:** PostgreSQL

## Installation

**Clone the repository**
```bash
  git clone https://github.com/mujtabamohamed/listly.git
```

**Install dependencies**

- **For the server:**
```bash
  cd server
  npm install
```

- **For the client:**
```bash
  cd client
  npm install
```

## Set up environment variables:

- **Create a .env file in the server directory and add your configuration.**
```bash
  PG_USER=
  PG_HOST=
  PG_DATABASE=
  PG_PASSWORD=
  PG_PORT=
  POSTGRES_URL=
  PORT=
```

- **Create a .env file in the client directory and add your configuration.**
```bash
  REACT_APP_SERVER_URL=
```

## Run the application
- **Start the server:**
```bash
  cd server
  npm start
```

- **Start the client:**
```bash
  cd client
  npm start
```
