import { Component, Input } from '@angular/core';
export type TipoIcone =
  | 'qr-code'
  | 'anexo'
  | 'play'
  | 'pausar'
  | 'download'
  | 'limpar'
  | 'prontuario'
  | 'email'
  | 'excluir'
  | 'whatsapp'
  | 'expandir'
  | 'masculino'
  | 'feminino'
  | 'save'
  | 'add'
  | 'ok'
  | 'estrela'
  | 'relogio'
  | 'retorno'
  | 'injecao'
  | 'consulta-medica'
  | 'cancelar'
  | 'confirmar'
  | 'editar'
  | 'pdf'
  | 'medica'
  | 'medico'
  | 'pessoa'
  | 'importar'
  | 'instrumento-medico';

@Component({
  selector: 'app-icone',
  template: `<img
    style="margin-right: 5px;"
    src="assets/icones/{{ name }}.png"
  />`,
})
export class IconeComponent {
  @Input() name?: TipoIcone;
  constructor() {}
}
