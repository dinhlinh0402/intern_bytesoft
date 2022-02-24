import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomersService } from 'src/customers/customers.service';

@Injectable()
export class JwtCustomerStrategy extends PassportStrategy(Strategy, 'jwt-customer') {
    constructor(private CustomerService: CustomersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret-key',
            logging: true
        });
    }

    async validate(payload: any) { // payload = decoded JWT
        const { email } = payload
        const user = await this.CustomerService.findByEmail(email)
        // console.log();

        if (!user) {
            throw new UnauthorizedException();
        }
        return payload
    }
}
