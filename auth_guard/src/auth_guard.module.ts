import { Module } from '@nestjs/common';
import { AuthGuardService } from './auth_guard.service';

@Module({
  providers: [AuthGuardService],
  exports: [AuthGuardService],
})
export class AuthGuardModule {}
