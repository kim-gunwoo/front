import { SetupServer, setupServer } from 'msw/node';
import { handlers } from '@/__mocks__/handlers';

export const server: SetupServer = setupServer(...handlers);
