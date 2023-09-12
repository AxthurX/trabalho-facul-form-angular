import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  keyToken: string = 'storage:token';
  keyLogin: string = 'storage:login';
  keyDadosColaborador: string = 'storage:colaborador';
  keyDadosEmpresa: string = 'storage:empresa';

  constructor(private router: Router, private http: HttpClient) {}

  get isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      const token = this.getToken();
      if (token) {
        return resolve(true);
      }
      return resolve(false);
    });
  }

  setToken(
    token: string,
    dados_colaborador: DadosColaborador,
    dados_empresa: DadosEmpresa
  ) {
    localStorage.setItem(this.keyToken, token);
    localStorage.setItem(
      this.keyDadosColaborador,
      JSON.stringify(dados_colaborador)
    );
    this.setDadosEmpresa(dados_empresa);
  }

  setDadosEmpresa(dados_empresa: DadosEmpresa) {
    localStorage.setItem(this.keyDadosEmpresa, JSON.stringify(dados_empresa));
  }

  setLogin(login: LoginResponse) {
    localStorage.setItem(this.keyLogin, JSON.stringify(login));
  }

  getToken() {
    return localStorage.getItem(this.keyToken);
  }

  getColaboradorLogado(): DadosColaborador {
    return JSON.parse(
      localStorage.getItem(this.keyDadosColaborador)?.toString() ?? ''
    );
  }

  getEmpresaLogada(): DadosEmpresa {
    return JSON.parse(
      localStorage.getItem(this.keyDadosEmpresa)?.toString() ?? ''
    );
  }

  getLogin(): LoginResponse {
    return JSON.parse(localStorage.getItem(this.keyLogin)?.toString() ?? '');
  }

  logout() {
    localStorage.removeItem(this.keyToken);
    localStorage.removeItem(this.keyLogin);
    localStorage.removeItem(this.keyDadosColaborador);
    this.router.navigateByUrl('/auth/login');
  }
}

export class LoginRequest {
  login_online: string;
  senha_online: string;
}

export class LoginResponse {
  authenticated: boolean;
  token: string;
  message: string;
  dados_colaborador: DadosColaborador;
  dados_empresa: DadosEmpresa;
}

export class DadosColaborador {
  nome: string;
  id_colaborador: number;
  id_usuario: number;
  tipo_usuario_nosso_dr: number;
}

export class DadosEmpresa {
  razao: string;
  fantasia: string;
  cpf_cnpj: string;
  cpf_cnpj_formatado: string;
  nome_colaborador: string;
  email: string;
  id: number;
  id_empresa_acessar: number;
  id_colaborador: number;
  id_usuario: number;
  id_banco_dados: number;
  habilitar_integracao_whatsapp_nosso_dr: boolean;
}
