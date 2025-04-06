import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IS_PUBLIC_KEY } from './public.decorator';
import { log } from 'console';

@Injectable()
export class RolesGuardService implements CanActivate {
    constructor(private reflector: Reflector,
    ) {}
  
    canActivate(context: ExecutionContext): boolean {
      // Public routes
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (isPublic) {
        return true;
      }
      
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      
      if (!requiredRoles) {
        return true;
      }
      
      const ctx = GqlExecutionContext.create(context);
      const { req } = ctx.getContext();
      const user = req.user;
      log("user: ", req.user);
      
      if (!user) {
        throw new ForbiddenException('You must be logged in to access this resource');
      }

      if (user.role === Role.PROFESSOR) {
        return true;
      }

      const userId = ctx.getArgs().id;
    if (userId!== user.id) {
      throw new ForbiddenException('You are not allowed to modify this resource');
    }
      
      return requiredRoles.some((role) => user.role === role);
    }
} 