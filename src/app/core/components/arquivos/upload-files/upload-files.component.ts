import { FileEntry } from './../model/file-entry.model';
import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../../services/files.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
})
export class UploadFilesComponent implements OnInit {
  constructor(private uplSrv: FilesService) {}

  files: FileEntry[] = [];
  ngOnInit() {}

  cancelarERemover(f: FileEntry, i: number) {
    f?.task?.cancel();
    this.remove(i);
  }

  remove(i: number) {
    this.files.splice(i, 1);
  }

  uploadAll() {
    for (let i = 0; i < this.files.length; i++) {
      this.uplSrv.upload(this.files[i]);
    }
  }

  onDroppedFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push({
        file: files.item(i),
        percentage: null,
        percentage_ionic: null,
        uploading: null,
        bytesuploaded: null,
        canceled: null,
        error: null,
        finishid: null,
        paused: null,
        state: null,
        task: null,
      });
    }
    this.uploadAll();
  }
}
