# Cromoteca
Repositorio para el proyecto de TFG de Jaume Civera Soriano. 
Cromoteca es una aplicación web para la colección e intercambio de cromos.

## Requerimientos para que todo funcione

```
npm i -g @nestjs/cli
```

### SERVER
Dentro de la carpeta /server/:
```
npm install --save @nestjs/mongoose mongoose
npm install class-validator --save
npm install class-transformer --save
npm i @nestjs/mapped-types --save
npm install --save @nestjs/swagger
npm install --save @nestjs/config
npm install dotenv --save
```

### CLIENT
Dentro de la carpeta /client/:
```
npm install @angular/cli@6.2.1
npm install
npm install @angular/material --save
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
