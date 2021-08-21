# Instalation guide

## General Considerations:

- Windows SO.
- This proyect uses the [IIC2513 course generator template](https://github.com/IIC2513/generator-template).
- Yeoman is a tool that will allow us to create a project from a template.

## Windows Subsystem Linux

Nuestra proyecto esta desarrollado en un entorno de Linux por lo que es necesario instalar wsl en Windows. Esto nos permite utilizar el administrador de versiones de node entre otras cosas. Una vez instalado wsl, en la consola debemos copiar los repositorios de backend y frontend del proyecto.

Our project is developed in a Linux environment so it is necessary to install WSL if you are on Windows. This allows us to use the node version manager among other things. Once WSL is installed, in the console we must clone the project's backend and frontend repositories.

## Instalation node, yarn & yeoman

First of all, for the project to work, it will be necessary to install node, yarn and yeoman, specifically the version of node used is 12.18.3. The following commands should be used in the wsl console:
- nvm install 12
- npm install -g yarn
- npm install -g yo

## Database & dotenv

In the backend, at the root of the project, a .env file must be created with the information from the postgresql database:

DB_NAME=mydatabase

DB_USERNAME=myuser

DB_PASSWORD=mypassword

## Install dependencies and run application

To install the project dependencies you must use the command "yarn install" in linux console.
Finally, both to run the backend or frontend you must use "yarn start" in linux console.

## Documentation

- [Repositorio del template](https://github.com/IIC2513/generator-template/wiki/Generator-commands)
- [Documentación de yarn](https://yarnpkg.com/)
- [Documentación de Yeoman](https://yeoman.io/)
- [Documentación nuestra API](https://documenter.getpostman.com/view/13524334/TzeWF7TR)
