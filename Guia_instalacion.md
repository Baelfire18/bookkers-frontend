# Guia de instalación

### Consideraciones generales:

- EL sistema operativo utilizado es Windows.
- El proyecto utiliza un template del curso IIC2513.
- Yeoman es una herramienta que nos permitirá crear un proyecto a partir de una plantilla.

#### Windows Subsystem Linux

Nuestra proyecto esta desarrollado en un entorno de Linux por lo que es necesario instalar wsl en Windows. Esto nos permite utilizar el administrador de versiones de node entre otras cosas. Una vez instalado wsl, en la consola debemos copiar los repositorios de backend y frontend del proyecto.

#### Instalación node, yarn y yeoman

En primer lugar para que el proyecto funcione será necesario instalar node, yarn y yeoman, específicamente la versión de node utilizada es la 12.18.3. Se deben utilizar los siguientes comandos en la consola de wsl:
- nvm install 12
- npm install -g yarn
- npm install -g yo

#### Base de datos y dotenv

En el backend en la raiz del proyecto se debe crear una archivo .env con la información de la base de datos de postgresql:

DB_NAME=mydatabase

DB_USERNAME=myuser

DB_PASSWORD=mypassword

#### Instalar dependencias y correr aplicación

Para instalar las dependencias del proyecto se debe utilizar el comando "yarn install" en wsl.
Finalmente, tanto para correr el backend o frontend se debe utilizar "yarn start" en wsl.

#### Documentación

[Repositorio del template](https://github.com/IIC2513/generator-template/wiki/Generator-commands)
[Documentación de yarn](https://yarnpkg.com/)
[Documentación de Yeoman](https://yeoman.io/)
[Documentación nuestra API, falta el link](https://documenter.getpostman.com/view/13524334/TzeWF7TR#70c4b41d-7485-4032-ae28-2318b9e0729e)
