import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersModel]),
        PassportModule.register({ defaultStrategy: 'jwt' }), // PassportModule 등록
        JwtModule.register({
            secret: 'secretKey', // 실제 애플리케이션에서는 환경 변수로 설정하세요.
            signOptions: { expiresIn: '60m' }, // 토큰의 만료 시간 설정
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})

// export class AuthModule { }
export class AuthModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
