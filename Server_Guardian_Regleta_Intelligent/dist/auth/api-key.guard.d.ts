import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class ApiKeyGuard implements CanActivate {
    private readonly apiKey;
    canActivate(context: ExecutionContext): boolean;
}
