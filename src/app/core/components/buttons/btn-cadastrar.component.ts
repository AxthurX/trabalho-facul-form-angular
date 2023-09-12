import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClasseBase } from '../../model/classe-base.model';

@Component({
  selector: 'app-btn-cadastrar',
  template: ` <button
    [disabled]="disabled"
    type="button"
    class="btn btn-icon-text btn-success btn-sm"
    (click)="ciclou()"
  >
    <app-icone [name]="'add'"></app-icone> Novo cadastro
  </button>`,
})
export class BtnCadastrarComponent {
  @Input() disabled: boolean = false;
  @Input() parent: ClasseBase;
  @Output() click: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ciclou(): void {
    if (this.click) {
      this.click.emit();
    }

    if (this.parent) {
      this.parent.OnCadastrar();
    }
  }
}
