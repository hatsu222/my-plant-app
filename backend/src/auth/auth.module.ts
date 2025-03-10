import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy'; // JWT戦略
import { JwtAuthGuard } from './jwt-auth.guard'; // 作成したJWT認証ガード
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret1111',
      signOptions: { expiresIn: '120m' }, //期限
    }),
    UserModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtAuthGuard, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
