import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuardService implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API key missing');
    }

    if (apiKey === process.env.API_KEY_ACTIVE || apiKey === process.env.API_KEY_OLD) {
      return true;
    } else {
      throw new UnauthorizedException('Invalid API key');
    }
  }
}