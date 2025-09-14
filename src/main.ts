import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './@common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import passport from 'passport';
import session from 'express-session';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production' ? [process.env.CLIENT_URL] : true,
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  // P_TODO: 나중에 jwt로 변경할 수도 있음.
  // express-session 설정 (passport.session() 보다 먼저 설정해야 함)
  app.use(
    session({
      secret: configService.get<string>('COOKIE_SECRET', 'sleact-secret-key'), // 환경변수에서 시크릿 키 가져오기
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false, // HTTPS에서는 true로 설정
        maxAge: 1000 * 60 * 60 * 24, // 24시간
      },
    }),
  );

  // passport 세션 사용
  app.use(passport.initialize());
  app.use(passport.session());

  const config = new DocumentBuilder()
    .setTitle('Sleact API')
    .setDescription('Sleact 개발을 위한 API 문서입니다.')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}
void bootstrap();
