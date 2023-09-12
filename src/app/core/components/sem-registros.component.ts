import { Component, Input } from '@angular/core';
export type TipoImagem = '404' | 'nenhum-agendamento';
@Component({
  selector: 'app-sem-registros',
  template: `<div class="row w-100 mx-0 auth-page">
    <div
      class="col-md-8 col-xl-7 mx-auto d-flex flex-column align-items-center"
    >
      <img
        src="assets/images/others/{{ imagem }}.svg"
        class="img-fluid mb-2"
        alt="{{ imagem }}"
      />
      <h5 class="mb-2">
        {{ descricao }}
      </h5>
    </div>
  </div>`,
})
export class SemRegistrosComponent {
  @Input() descricao: string = '';
  @Input() imagem?: TipoImagem;
  constructor() {}
}
