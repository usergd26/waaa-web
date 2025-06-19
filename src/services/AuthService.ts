import interceptor from '../interceptor';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const AuthService = {
  async login(credentials: LoginRequest): Promise<any> {debugger
const response = await interceptor.post('/login', credentials, {
  withCredentials: true
});

    return response.data;
  },

  logout() {
  }
};
