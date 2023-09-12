import Swal, { SweetAlertInput, SweetAlertIcon } from 'sweetalert2';
import { DatePipe, formatDate } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Value } from './model/value.model';

export type PredefinedColorsCardNumber =
  | 'success'
  | 'info'
  | 'danger'
  | 'warning';

export class Util {
  static GetTiposSexo(): Value[] {
    return [
      {
        descricao: 'Masculino',
        id: 0,
        icone: 'masculino',
        value_string: 'M',
      },
      {
        descricao: 'Feminino',
        id: 1,
        icone: 'feminino',
        value_string: 'F',
      },
    ];
  }

  static GetPeriodos(): Value[] {
    return [
      {
        descricao: 'dia(s)',
        id: 0,
      },
      {
        descricao: 'mês(ses)',
        id: 1,
      },
      {
        descricao: 'ano(s)',
        id: 2,
      },
    ];
  }

  static GetDataFormatada(data?: Date, formato?: string): string | undefined {
    try {
      var datePipe = new DatePipe('pt-BR');

      return datePipe.transform(data, formato)?.toString();
    } catch (e) {
      console.error('GetDataFormatada', e);
      return '';
    }
  }

  static NgbDateStructToDate(
    ngbDate: NgbDateStruct,
    hora: number,
    minuto: number
  ): Date {
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day, hora, minuto);
  }

  static StringIsNumber(s: any) {
    const x = +s; // made cast obvious for demonstration
    return x.toString() === s;
  }

  static calculateDiff(dateSent: any) {
    const currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor(
      (Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      ) -
        Date.UTC(
          dateSent.getFullYear(),
          dateSent.getMonth(),
          dateSent.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
  }

  static AnyToBool(valor: any) {
    try {
      if (!valor) {
        return null;
      }

      return valor === 'true';
    } catch {
      return false;
    }
  }

  static randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static CalculaPorcentagem(
    valor_informado: number,
    valor_total: number
  ): number {
    return this.GetValorArredondado((valor_informado * 100) / valor_total);
  }

  static CalculaValorSobrePorcentagem(
    valor_informado: number,
    porcentagem: number
  ): number {
    return this.GetValorArredondado(valor_informado * (porcentagem / 100));
  }

  static GetValorArredondado(
    valor: number,
    casas_decimais: number = 2
  ): number {
    return parseFloat(valor.toFixed(casas_decimais));
  }

  static NotificacaoSucesso(title: string) {
    this.Notificacao(title, 'success');
  }

  static NotificacaoErro(title: string) {
    this.Notificacao(title, 'error');
  }

  static NotificacaoAlerta(title: string) {
    this.Notificacao(title, 'warning');
  }

  static NotificacaoInfo(title: string) {
    this.Notificacao(title, 'info');
  }

  static Notificacao(
    title: string,
    icon: SweetAlertIcon,
    timer: number = 3000
  ) {
    Swal.fire({
      heightAuto: false,
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer,
      title,
      icon,
    });
  }

  static NotificacaoConfiguracao(title: string, icon: SweetAlertIcon) {
    Swal.fire({
      heightAuto: false,
      toast: true,
      position: 'bottom-right',
      showConfirmButton: false,
      timer: 4000,
      title,
      icon,
    });
  }

  static logarErro(e: any) {
    const key = 'nossodr:log_erro';
    let erros: any[];
    const listaSalva = localStorage.getItem(key);
    if (listaSalva) {
      erros = JSON.parse(listaSalva);
    } else {
      erros = [];
    }

    while (erros.length >= 20) {
      erros.pop();
    }
    erros.push(e);

    localStorage.setItem(key, JSON.stringify(erros));

    console.error(e);
  }

  static GetDateTimeNowToString(
    format: string = 'dd/MM/yyyy HH:mm:ss'
  ): string {
    return formatDate(new Date(), format, 'en-US');
  }

  static async EspecificarTexto(
    title: string,
    inputPlaceholder: string,
    input: SweetAlertInput = 'textarea',
    textoSalvo?: string
  ) {
    if (!textoSalvo) {
      textoSalvo = '';
    }

    return Swal.fire({
      title,
      input,
      inputPlaceholder,
      inputValue: textoSalvo,
      showCancelButton: true,
      heightAuto: false,
    });
  }

  static GetClassSaldo(valor: number): string {
    if (valor > 0) {
      return 'success';
    }
    if (valor < 0) {
      return 'danger';
    }
    return 'primary';
  }

  static CopyText(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  static TratarErro(e: any) {
    Util.AlertErrorPadrao();
    console.error(e);
  }

  static AlertError(mensagem: string) {
    this.Alert('Ops...', mensagem, 'error');
  }

  static AlertSucess(mensagem: string) {
    this.Alert('OK', mensagem, 'success');
  }

  static AlertErrorPadrao() {
    this.Alert('Ops...', 'Algo deu errado, tente novamente', 'error');
  }

  static AlertErrorStatus(status: number) {
    this.Alert(
      'Ops...',
      'Ocorreu algum erro, tente novamente, cód do erro: ' + status,
      'error'
    );
  }

  static AlertWarning(mensagem: string) {
    this.Alert('Atenção!', mensagem, 'warning');
  }

  static AlertInfo(mensagem: string) {
    this.Alert('', mensagem, 'info');
  }

  static Alert(title?: string, html?: string, icon?: SweetAlertIcon) {
    Swal.fire({
      title,
      html,
      icon,
      heightAuto: false,
    });
  }

  static Confirm(pergunta: string) {
    return Swal.fire({
      heightAuto: false,
      title: '<strong>Confirma esta ação?</strong>',
      icon: 'question',
      html: pergunta,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<ion-icon name="thumbs-up"></ion-icon> Sim',
      cancelButtonText: '<ion-icon name="thumbs-down"></ion-icon> Não',
    });
  }
}
