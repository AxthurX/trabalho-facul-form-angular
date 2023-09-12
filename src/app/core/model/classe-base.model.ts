import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Util } from '../util.model';
export class ClasseBase {
  carregando: boolean = false;
  salvando: boolean = false;
  tentando_salvar: boolean = false;
  modal_lookp: NgbModalRef;
  TratarErro(e: any) {
    Util.TratarErro(e);
    this.resetarPropriedades();
  }

  getTitulo() {
    return '???';
  }

  setSalvando() {
    this.salvando = this.tentando_salvar = true;
  }

  resetarPropriedades() {
    this.carregando = false;
    this.tentando_salvar = false;
    this.salvando = false;
  }

  Warning(mensagem: string) {
    this.resetarPropriedades();
    Util.AlertWarning(mensagem);
  }

  Success(mensagem: string) {
    this.resetarPropriedades();
    Util.AlertSucess(mensagem);
  }

  Error(mensagem: string) {
    this.resetarPropriedades();
    Util.AlertError(mensagem);
  }

  Info(mensagem: string) {
    this.resetarPropriedades();
    Util.AlertInfo(mensagem);
  }

  OnSalvar() {}
  OnCadastrar() {}
  OnCancelar() {}
  OnEditar(objeto: any) {}
  OnPesquisar(texto: string) {}
  OnFecharLookup() {
    this.modal_lookp?.close();
  }

  OnSelecionarObjeto(cod: string, descricao: string, telefone: string) {
    this.modal_lookp?.dismiss({
      cod,
      descricao,
      telefone,
    });
  }
}
