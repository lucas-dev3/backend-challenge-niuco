import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const { method, url } = request;
      const now = Date.now();
  
      console.log(`Incoming Request: ${method} ${url}`);
  
      return next
        .handle()
        .pipe(
          tap(() => console.log(`Response for: ${method} ${url} - Time: ${Date.now() - now}ms`)),
        );
    }
  }
  