import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from 'src/user/entities/user.entity';

export abstract class AbstractIsAuthorized implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request?.user)
      throw Error('There is a possibility that you have not used JwtAuthGuard');
    if (request.user.role === UserRole.admin) return true;
    return this.validate(request, context);
  }

  abstract validate(request: any, context: ExecutionContext): Promise<boolean>;
}
