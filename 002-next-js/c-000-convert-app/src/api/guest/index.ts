import { GuestLoginInterface } from '@/types/Guest.types';
import { guestInstance } from '../config';

export const GUEST_LOGIN = '/v2/users/authentication/guest';

export const guestApi = {
  login: () => GUEST_LOGIN,
  signUp: () => '/v2/users/authentication',
};

export class GuestApi {
  static accessTokenKey = '_act';
  static refreshTokenKey = '_act';

  static getAccessToken() {
    return sessionStorage.getItem(this.accessTokenKey);
  }

  static getRefreshToken() {
    return sessionStorage.getItem(this.refreshTokenKey);
  }

  static setToken(response: GuestLoginInterface) {
    sessionStorage.setItem(this.accessTokenKey, response.access_token);
    sessionStorage.setItem(this.refreshTokenKey, response.refresh_token);
  }

  static async login(): Promise<GuestLoginInterface> {
    try {
      const response = await guestInstance.post(guestApi.login());
      this.setToken(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async checkSignUp(phone: string): Promise<any> {
    try {
      const response = await guestInstance.get(guestApi.signUp(), {
        params: {
          phone: phone,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
