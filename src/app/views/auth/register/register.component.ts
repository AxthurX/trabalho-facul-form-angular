import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CepService, RetornoEndereco } from 'src/app/core/services/cep.service';
import { Util } from 'src/app/core/util.model';
import { Usuario } from './register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  usuario = new Usuario();
  usuarios: Usuario[] = [];
  consultandoEndereco: boolean;
  enderecoConsultado: RetornoEndereco;
  age: number;
  constructor(private router: Router, private cepSrv: CepService) {}

  ngOnInit(): void {}

  onRegister(e: Event) {
    e.preventDefault();
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/']);
    }
  }

  onConsutarCEP(usuario: any) {
    try {
      if (usuario.cep && usuario.cep.length === 8 && navigator.onLine) {
        this.consultandoEndereco = true;
        this.cepSrv.consultaCEP(usuario.cep).subscribe({
          next: (endereco) => {
            this.enderecoConsultado = endereco;
            if (endereco.erro) {
              Util.AlertWarning(
                'CEP não localizado, verifique se está correto!'
              );
              this.consultandoEndereco = false;
            } else {
              usuario.complemento = endereco.complemento;
              usuario.logradouro = endereco.logradouro;
              usuario.bairro = endereco.bairro;
              usuario.uf = endereco.uf;
              usuario.municipio = endereco.localidade;

              this.consultandoEndereco = false;
            }
          },
        }),
          (e: any) => {
            Util.TratarErro(e);
            this.consultandoEndereco = false;
          };
      }
    } catch (e) {
      Util.TratarErro(e);
      this.consultandoEndereco = false;
    }
  }

  async ApagarTudo() {
    await Util.Confirm(
      `Deseja realmente apagar tudo?
      Essa ação não pode ser desfeita.`
    ).then((res) => {
      if (res.isConfirmed) {
        try {
          this.usuario = new Usuario();
        } catch (e) {
          Util.TratarErro(e);
        }
      }
    });
  }

  onChange(e: any) {
    this.usuario.sexo = e.target.value;
  }

  pegarIdade() {
    const today = new Date();
    const birthDate = new Date(this.usuario.data_nascimento);

    // Calcula a idade subtraindo o ano de nascimento do ano atual
    const age = today.getFullYear() - birthDate.getFullYear();

    // Verifica se o mês de nascimento já ocorreu este ano
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      this.age = age - 1;
    } else {
      this.age = age;
    }
  }
}
