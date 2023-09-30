import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  mixin,
  Type,
} from '@nestjs/common';

const RoleGuard = (role: string): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<any>();
      const { user } = request;
      console.log('user:', user);
      const abc = user?.user.role.includes(role);
      console.log(abc);
      if (!abc) {
        throw new HttpException('No Permission', HttpStatus.BAD_REQUEST);
      } else {
        return abc;
      }
    }
  }
  return mixin(RoleGuardMixin);
};
export default RoleGuard;
