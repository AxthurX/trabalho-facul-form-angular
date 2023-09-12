import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-submit',
  template: ` <button
    [disabled]="disabled"
    type="submit"
    class="btn btn-icon-text btn-primary btn-sm"
  >
    <app-icone [name]="'save'"></app-icone> Salvar
  </button>`,
})
export class BtnSubmitComponent {
  @Input() disabled: boolean = false;
  constructor() {}
}
