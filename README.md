# Cromoteca
Repositorio para el proyecto de TFG de Jaume Civera Soriano. 
Cromoteca es una aplicación web para la colección e intercambio de cromos.

## SonarCloud Frontend (client) Status
[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=jaumoso_cromoteca-client)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-client)
## SonarCloud Backend (server) Status
[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=jaumoso_cromoteca-server)](https://sonarcloud.io/summary/new_code?id=jaumoso_cromoteca-server)

---------------------------------------------------------
## Requerimientos para que todo funcione

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

Generación de códigos de seguridad de recuperación
```
// TO-DO
```

# TO-DO:

- Paginator en la seccion de colecciones
- Validación para la creación y edición de los usuarios - comprobación de existencia en base de datos
- Layout para pantallas pequeñas y grandes
- Proteger las rutas
- Mat Spinner
- Pattern validators en createaccount
- Validación en editprofile
- Unificar CSS en variables globales
- RECUPERACIÓN DE CONTRASEÑA A MEDIAS
- Cuando se borra una colección de library, tiene que borrar los cromos guardados

