import { AuthApiInstance } from './auth';
import { ApiInstance } from './base';

export const authInstance = AuthApiInstance.getInstance();

export const baseInstance = new ApiInstance().getInstance();

export { ApiInstance };
