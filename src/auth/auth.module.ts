import { Module } from '@nestjs/common';
// import { AuthService } from './auth.servic/e';
// import { AuthController } from './auth.controller';
import { PrismaService } from '../database/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'supersecret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
