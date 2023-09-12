import { Component, Input } from '@angular/core';
import { ILookup } from '../interfaces/ilookup.i';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-lookup',
  template: `<div class="row">
    <div class="col-md-2" *ngIf="!ocultar_codigo">
      <input
        oninput="this.value = this.value.toUpperCase()"
        type="text"
        class="form-control"
        autocomplete="off"
        value="{{ ilookup?.objeto_selecionado?.cod }}"
      />
    </div>
    <div class="col-md-{{ ocultar_codigo ? '10' : '8' }}">
      <input
        readonly
        type="text"
        [placeholder]="placeholder"
        class="form-control"
        autocomplete="off"
        value="{{ ilookup?.objeto_selecionado?.descricao }}"
        value="ilookup?.objeto_selecionado?.telefone"
      />
    </div>
    <div class="col-md-2">
      <button
        *ngIf="ilookup?.objeto_selecionado?.cod"
        type="button"
        class="btn-close"
        aria-label="Close"
        style="margin-right: 4px;"
        (click)="ilookup.onLimpar()"
      ></button>
      <button type="button" class="btn btn-primary btn-icon" (click)="show()">
        <i class="feather icon-search"></i>
      </button>
    </div>
  </div>`,
})
export class LookupComponent {
  @Input() placeholder: string = '';
  @Input() ilookup: ILookup;
  @Input() ocultar_codigo: boolean = false;
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    //config.backdrop = 'static';
    //config.keyboard = false;
    config.size = 'xl';
    config.centered = true;
  }
  show() {
    const modalRef = this.modalService.open(this.ilookup.getComponent());
    modalRef.componentInstance.modal_lookp = modalRef;

    modalRef.dismissed.subscribe((r) => {
      if (r) {
        this.ilookup.objeto_selecionado = r;
      }
    });
  }
}

export class LookupModel {
  cod: string;
  descricao: string;
  telefone?: string;
}
