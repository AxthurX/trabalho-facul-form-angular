import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClasseBase } from '../../model/classe-base.model';

@Component({
  selector: 'app-btn-editar',
  template: `
    <button
      *ngIf="!apenas_icone"
      [disabled]="disabled"
      type="button"
      class="btn btn-icon-text btn-light btn-sm"
      (click)="ciclou()"
    >
      <app-icone [name]="'editar'"></app-icone> Editar
    </button>

    <span (click)="ciclou()" style="cursor: pointer;">
      <app-icone *ngIf="apenas_icone" [name]="'editar'"></app-icone>
    </span>
  `,
})
export class BtnEditarComponent {
  @Input() disabled: boolean = false;
  @Input() parent: ClasseBase;
  @Input() objeto: any;
  @Input() apenas_icone: boolean = false;
  @Output() click: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ciclou(): void {
    if (this.click) {
      this.click.emit(this.objeto);
    }
    if (this.parent) {
      this.parent.OnEditar(this.objeto);
    }
  }
}
