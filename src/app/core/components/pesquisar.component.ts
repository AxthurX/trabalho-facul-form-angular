import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClasseBase } from '../model/classe-base.model';

@Component({
  selector: 'app-pesquisar',
  template: `<div class="search-form">
    <div class="input-group">
      <div class="input-group-text">
        <i class="feather icon-search"></i>
      </div>
      <input
        [(ngModel)]="texto"
        oninput="this.value = this.value.toUpperCase()"
        type="text"
        id="txtPesquisa"
        class="form-control"
        placeholder="Pesquisar..."
        (keyup.enter)="onEnter()"
      />
    </div>
  </div>`,
})
export class PesquisarComponent implements OnInit {
  @Output() OnPesquisar: EventEmitter<string> = new EventEmitter();
  texto: string = '';
  @Input() parent: ClasseBase;
  constructor() {}
  ngOnInit(): void {
    try {
      setTimeout(() => {
        document.getElementById('txtPesquisa')?.focus();
      }, 500);
    } catch (e) {}
  }

  onEnter() {
    if (this.OnPesquisar) {
      this.OnPesquisar.emit(this.texto);
    }

    if (this.parent) {
      this.parent.OnPesquisar(this.texto);
    }
  }
}
