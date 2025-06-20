import interceptor from '../interceptor';
import type { LoginRequest } from '../interfaces/Authentication';

export const AuthService = {

  async login(credentials: LoginRequest): Promise<any> {
    try {
      const response = await interceptor.post('/login', credentials, {
        withCredentials: true
      });
      return response.data;
    } catch (error: any) {
      console.error('Login failed:', error);
      alert('login failed');
    }
  },


  logout() {
  },

  async isAdminUser(): Promise<boolean> {
    const response = await interceptor.get('/my-roles', {
      withCredentials: true
    });

    return response.data.roles.includes('admin');
  }

};
