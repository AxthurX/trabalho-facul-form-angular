import { MyFile } from './../model/my-file.model';
import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../../services/files.service';
import { Util } from '../../../util.model';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
})
export class MyFilesComponent implements OnInit {
  arquivos: MyFile[] = [];
  constructor(private srv: FilesService) {}
  ngOnInit() {
    try {
      this.srv.getArquivos().subscribe((r) => {
        this.arquivos = r;
      });
    } catch (e) {
      Util.NotificacaoErro('Erro ao consultar arquivos já anexados');
    }
  }

  async delete(f: MyFile) {
    let result = await Util.Confirm('Excluir arquivo');

    if (result.isConfirmed) {
      this.srv.deteleFile(f);
    }
  }

  open(url: string) {
    window.open(url, '_blank');
  }
}
