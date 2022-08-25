import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from 'src/user/entities/user.entity';

export abstract class AbstractIsCreator implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request?.user) return false;
    if (request.user.role === UserRole.admin) return true;
    return this.validate(request);
  }

  abstract validate(request: any): Promise<boolean>;
}
