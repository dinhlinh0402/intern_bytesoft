import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtUserStrategy } from './jwt-user.strategy';
import { PassportModule } from '@nestjs/passport';
import { CustomersModule } from 'src/customers/customers.module';
import { JwtCustomerStrategy } from './jwt-customer.strategy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    CustomersModule,
    JwtModule.register({
      secret: 'secret-key'
    })
  ],
  providers: [AuthResolver, AuthService, JwtUserStrategy, JwtCustomerStrategy]
})
export class AuthModule { }
