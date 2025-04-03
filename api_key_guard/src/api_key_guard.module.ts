import { Module } from '@nestjs/common';
import { ApiKeyGuardService } from './api_key_guard.service';

@Module({
  providers: [ApiKeyGuardService],
  exports: [ApiKeyGuardService],
})
export class ApiKeyGuardModule {}
