import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'jwt-user') {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret-key',
            logging: true
        });
    }

    async validate(payload: any) { // payload = decoded JWT
        const { email } = payload
        const user = await this.userService.findOne(email)
        if (!user) {
            throw new UnauthorizedException();
        }
        return payload
    }
}
