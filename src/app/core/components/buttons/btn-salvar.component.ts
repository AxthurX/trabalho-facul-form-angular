import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClasseBase } from '../../model/classe-base.model';

@Component({
  selector: 'app-btn-salvar',
  template: ` <button
    [disabled]="disabled"
    type="button"
    class="btn btn-icon-text btn-primary btn-sm"
    (click)="ciclou()"
  >
    <app-icone [name]="'save'"></app-icone> Salvar
  </button>`,
})
export class BtnSalvarComponent {
  @Input() disabled: boolean = false;
  @Input() parent: ClasseBase;
  @Output() click: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ciclou(): void {
    if (this.click) {
      this.click.emit();
    }

    if (this.parent) {
      this.parent.OnSalvar();
    }
  }
}
