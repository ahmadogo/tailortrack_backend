import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET') || '',
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload received:', payload);
    const user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      fashionHouseId: payload.fashionHouseId ?? null,
    };
    console.log('User object created:', user);
    return user;
  }
}