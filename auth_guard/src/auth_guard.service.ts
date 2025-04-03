import { Injectable, ForbiddenException, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const token = request.headers['authorization'];
  
      if (!token) {
        throw new ForbiddenException('Authorization token is missing');
      }
      try {
        const decoded = this.jwtService.verify(token.split(' ')[1], { secret: process.env.JWT_SECRET });
        const role = decoded['role'];
        request.user = { ...decoded, role };
  
        return true;
      } catch (error) {
        throw new ForbiddenException('Invalid or expired token');
      }
    }
  }
