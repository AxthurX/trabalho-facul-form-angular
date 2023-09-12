import { Component, Input } from '@angular/core';
import { ClasseBase } from '../model/classe-base.model';

@Component({
  selector: 'app-titulo',
  template: ` <div
    class="p-4 d-flex align-items-center justify-content-between"
  >
    <h5 class="modal-title" id="exampleModalLabel">
      {{ parent.getTitulo() }}
    </h5>
    <button
      *ngIf="parent.modal_lookp"
      type="button"
      class="btn-close"
      aria-label="Close"
      (click)="parent.OnFecharLookup()"
    ></button>
  </div>`,
})
export class TituloComponent {
  @Input() parent: ClasseBase;
  constructor() {}
}
