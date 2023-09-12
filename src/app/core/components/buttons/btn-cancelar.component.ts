import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClasseBase } from '../../model/classe-base.model';

@Component({
  selector: 'app-btn-cancelar',
  template: ` <button
    [disabled]="disabled"
    type="button"
    class="btn btn-icon-text btn-danger btn-sm"
    (click)="ciclou()"
  >
    <app-icone [name]="'cancelar'"></app-icone> Cancelar
  </button>`,
})
export class BtnCancelarComponent {
  @Input() disabled: boolean = false;
  @Input() parent: ClasseBase;
  @Input() modal: any;
  @Output() click: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ciclou(): void {
    if (this.modal) {
      this.modal.close();
    }

    if (this.click) {
      this.click.emit();
    }

    if (this.parent) {
      this.parent.OnCancelar();
    }
  }
}
