# Cromoteca
Repositorio para el proyecto de TFG de Jaume Civera Soriano. 
Cromoteca es una aplicación web para la colección e intercambio de cromos.

Frontend (client) | Backend (server)
----------------- | -----------------
[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=jaumoso_cromoteca-client)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-client)| [![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=jaumoso_cromoteca-server)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-server)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-client&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-client) | [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-server&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-server)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-client&metric=bugs)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-client) | [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-server&metric=bugs)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-server)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-client&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-client) | [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-server&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-server)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-client&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-client) | [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-server&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-server)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-client&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-client) | [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-server&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-server)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-client&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-client) | [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-server&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-server)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-client&metric=coverage)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-client) | [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-server&metric=coverage)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-server)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-client&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-client) | [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-server&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-server)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-client&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-client) | [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-server&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-server)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-client&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-client) | [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jaumoso_cromoteca-server&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-server)

---------------------------------------------------------

# Lanzar contenedores
Se necesita docker o podman instalado en la máquina local y haber descargado las imágenes previamente.
Consultad _docker-compose.yml_ para obtener las variables de entorno.

### Lanzar contenedores por separado
CLIENTE
```
docker run -p 4200:80 --name cromoteca_client <imagen cliente>
```

SERVIDOR
```
docker run -p 3000:3000 -e DB_USER=jaumoso -e DB_PASSWORD=<contraseña> -e JWT_SECRET="<JWT secret>" --name cromoteca_server <imagen servidor>
```
### Lanzar Contenedores con docker-compose
Desde la carpeta raíz del proyecto, ejecutar el comando:
```
docker-compose up -d
```
* La etiqueta '-d' es opcional, para que corra como proceso en segundo plano, o 'detached'.


## Requisitos para que todo funcione

NODE Version: 16.10

```
npm install -g @nestjs/cli
```

### SERVER
Dentro de la carpeta /server/:
```
npm install --save @nestjs/mongoose mongoose
npm install class-validator --save
npm install class-transformer --save
npm install @nestjs/mapped-types --save
npm install --save @nestjs/swagger
npm install --save @nestjs/config
npm install dotenv --save
npm i mongodb-memory-server --save

```
Authentication: 
```
npm install --save @nestjs/passport passport

//NO UTILIZADO DE MOMENTO
npm install --save passport-google-oauth20
npm install -D @types/passport-google-oauth20
npm install google-auth-library --save
// ---

npm install --save passport-local
npm install --save-dev @types/passport-local

npm install --save @types/bcrypt
npm install --save bcrypt

npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt

npm install --save @auth0/angular-jwt
```

### CLIENT
Dentro de la carpeta /client/:
```
npm install @angular/cli
yarn install
npm install @angular/material@14.2 --save
npm install @angular/animations --save
npm install hammerjs --save
npm install @angular/flex-layout --save
```
Añadir a index.html:
```
<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```
Y los imports:
```
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
```
```
import 'hammerjs';
```
```
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
  ],
```
En styles.scss:
```
/* You can add global styles to this file, and also import other style files */
@import '~@angular/material/prebuilt-themes/deeppurple-amber.css';

// Some basic resets

body {
    padding: 0;
    margin: 0;
    font-family: Roboto, sans-serif;
}
```

### Font Awesome
```
npm install @fortawesome/fontawesome-free --save
npm install @fortawesome/fontawesome-svg-core --save
```
I en angular.json:
```
"styles": [
  ...
  "node_modules/@fortawesome/fontawesome-free/css/all.css"
  ...
]
```


### Font Awesome (deprecated)
```
npm install font-awesome@4.7.0 --save
```
Crear archivo _variables.scss en root del proyecto:
```
$fa-font-path: '../node_modules/font-awesome/fonts'
```
Importar font awesome en styles.scss:
```
@import 'variables';
@import '../node_modules/font-awesome/scss/font-awesome.scss';
```

### SONARQUBE
```
npm install sonar-scanner --save-dev
```
Añadir sonar-scanner a los scripts en package.json:
```
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "watch": "ng build --watch --configuration development",
  "test": "ng test",
  "start:dev": "ng serve -o --watch",
  "sonar": "sonar-scanner"
```
Para ejecutar un análisis:
```
yarn sonar
```

### Envío de Emails

Servidor de envío de emails SMTP -> TODO
```
// TODO
Nodemailer & types/@nodemailer
```

# TO-DO:

- Mat Spinner
- Recuperación de contraseñas (necesito servidor SMTP)
- filtrado en las tablas de market y adverts

### LATE-STAGE
- Proteger las rutas y borrar endpoints de desarrollo, httpOptions en los services: añadir header Authorization: Bearer Token

### A FUTURO

- Añadir idiomas
- Exportar colecciones a pdf o excel
