import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class LoggerMiddlerware implements NestMiddleware {
  private logger = new Logger('http');
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    //const userAgent = req.get('user-agent');
    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} `,
      );
    });
    next();
  }
}
