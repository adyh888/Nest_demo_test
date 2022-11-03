import { VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';//响应格式的处理
import  { AllExceptionsFilter } from './common/exceptions/base.exception.filter';//默认捕获所以异常
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';//只捕获HTTP异常错误
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';//swgger文档

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  // 接口版本化管理
  app.enableVersioning({
    type: VersioningType.URI,
  });

  //统一响应的格式
  app.useGlobalInterceptors(new TransformInterceptor());

  //异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  //swagger文档
  const options = new DocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addTag('cats')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // 默认情况下，`Fastify`仅在 `localhost 127.0.0.1` 接口上监听
  // 改成 0.0.0.0 接受其他主机上的连接
  await app.listen(3300, '0.0.0.0');

}
bootstrap();
