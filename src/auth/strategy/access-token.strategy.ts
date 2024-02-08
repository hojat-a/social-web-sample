import {
  ExtractJwt,
  Strategy
} from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env["JWT_SECRET"],
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, role: payload.role, tokenId: payload.jti };
  }
}
