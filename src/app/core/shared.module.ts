import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarregandoComponent } from './components/carregando.component';
import { IconeComponent } from './components/icone.component';
import { LookupComponent } from './components/lookup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TituloComponent } from './components/titulo.component';
import { PesquisarComponent } from './components/pesquisar.component';
import { BtnCadastrarComponent } from './components/buttons/btn-cadastrar.component';
import { BtnSalvarComponent } from './components/buttons/btn-salvar.component';
import { BtnCancelarComponent } from './components/buttons/btn-cancelar.component';
import { SemRegistrosComponent } from './components/sem-registros.component';
import { BtnSubmitComponent } from './components/buttons/btn-submit.component';
import { BtnEditarComponent } from './components/buttons/btn-editar.component';
import { MyFilesComponent } from './components/arquivos/my-files/my-files.component';
import { UploadFilesComponent } from './components/arquivos/upload-files/upload-files.component';
import { DropZoneComponent } from './components/arquivos/upload-files/drop-zone/drop-zone.component';

@NgModule({
  declarations: [
    CarregandoComponent,
    IconeComponent,
    LookupComponent,
    TituloComponent,
    PesquisarComponent,
    BtnCadastrarComponent,
    BtnSalvarComponent,
    BtnCancelarComponent,
    SemRegistrosComponent,
    BtnSubmitComponent,
    BtnEditarComponent,
    MyFilesComponent,
    UploadFilesComponent,
    DropZoneComponent,
  ],
  imports: [CommonModule, FormsModule, NgbModule],
  exports: [
    CommonModule,
    FormsModule,
    CarregandoComponent,
    IconeComponent,
    LookupComponent,
    NgbModule,
    TituloComponent,
    PesquisarComponent,
    BtnCadastrarComponent,
    BtnSalvarComponent,
    BtnCancelarComponent,
    SemRegistrosComponent,
    BtnSubmitComponent,
    BtnEditarComponent,
    MyFilesComponent,
    UploadFilesComponent,
    DropZoneComponent,
  ],
})
export class SharedModule {}
