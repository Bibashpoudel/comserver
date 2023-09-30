import { nodeMailer } from './nodeMailer';

export function errorMessage(message: any) {
  nodeMailer(
    { functionName: 'addProviences', message },
    'debug',
    'info',
  );
}
