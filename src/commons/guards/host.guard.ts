import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { envs } from 'src/config';

@Injectable()
export class HostGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const origin = [
      'http://localhost:9000',
      'http://localhost:9001',
      'http://localhost:9200',
      'https://app.motowork.xyz',
      'http://testbanner.test',
      'http://admin.motowork.xyz/',
      'https://admin.motowork.xyz',
      'http://app.motowork.xyz',
      'https://app.motowork.xyz',
      'https://motowork.xyz',
      'http://motowork.xyz',
      'http://motowork.co',
      'https://motowork.co',
      "http://admin.motowork.co",
      "https://admin.motowork.co"
    ];

    const { headers } = context.switchToHttp().getRequest();
    // if (envs.app_env === 'production' && !origin.includes(headers.origin)) {
    //   throw new UnauthorizedException(
    //     'No puedes acceder a este recurso desde ese host',
    //   );
    // }
    return true;
  }
}
