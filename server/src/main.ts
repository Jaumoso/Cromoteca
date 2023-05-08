import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Cromoteca')
    .setDescription('Documentación de la API de la Cromoteca. Aquí puedes encontrar todas las funciones y llamadas del backend, para poder probar su funcionamiento.')
    .setVersion('1.0')
    /* .addTag('Cromoteca') */
    .build();

  const options: SwaggerDocumentOptions =  {
    deepScanRoutes: true,
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Cromoteca API Docs'
  }

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document, customOptions);

  app.enableCors();
  await app.listen(3000);

    console.log(`\nPara ver la documentación de la API: ${await app.getUrl()}/api \n`);
    console.log(`Para descargar el JSON del Swagger API: ${await app.getUrl()}/api-json`);
}
bootstrap()
.catch((error) => {console.error(error);});
