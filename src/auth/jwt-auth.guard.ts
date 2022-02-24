import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class JwtUserAuthGuard extends AuthGuard('jwt-user') {
    getRequest(context: ExecutionContext) {
        // console.log('run JwtUserAuthGuard');

        const ctx = GqlExecutionContext.create(context)
        // console.log('ctx.getContext().req', ctx.getContext().req.headers);

        return ctx.getContext().req
    }
}

export class JwtCustomerAuthGuard extends AuthGuard('jwt-customer') {
    getRequest(context: ExecutionContext) {
        // console.log('run JwtUserAuthGuard');

        const ctx = GqlExecutionContext.create(context)
        // console.log('ctx.getContext().req', ctx.getContext().req.headers);

        return ctx.getContext().req
    }
}