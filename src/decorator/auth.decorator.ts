import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

export function LoginRequired() {
  return applyDecorators(
    UseGuards(AuthGuard('jwt')),
    ApiBearerAuth()
  )
}