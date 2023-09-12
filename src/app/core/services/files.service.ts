import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, catchError, finalize } from 'rxjs/operators';
import { from, of, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore/public_api';
import { FileEntry } from '../components/arquivos/model/file-entry.model';
import { MyFile } from '../components/arquivos/model/my-file.model';
import { Util } from '../util.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private pasta: string = 'arquivos_clinicas';
  private collection: AngularFirestoreCollection<MyFile>;
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private auth: AuthService
  ) {
    this.collection = afs.collection(this.pasta, (ref) =>
      ref.orderBy('date', 'desc')
    );
  }

  upload(f: FileEntry) {
    let newFileName = `${new Date().getTime()}_${f.file?.name}`;
    let path = `${this.pasta}/${newFileName}`;
    f.task = this.storage.upload(path, f.file);
    f.state = f.task.snapshotChanges().pipe(
      map((s) => (f.task ? f.task.task.snapshot.state : '')),
      catchError((s) => {
        console.error(f);
        if (f.task) return of(f.task.task.snapshot.state);

        return of();
      })
    );
    this.fillAttributes(f);
    f.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          if (f.task)
            if (f.task.task.snapshot.state == 'success') {
              this.storage
                .ref(path)
                .getDownloadURL()
                .subscribe({
                  next: (url_completa) => {
                    if (f.file) {
                      this.collection.add({
                        filename: f.file.name,
                        type: f.file.type,
                        path,
                        url_completa,
                        date: new Date().getTime(),
                        size: f.file.size,
                        usuario: this.auth.getColaboradorLogado().nome,
                      });
                    }
                  },
                  error: (e) =>
                    Util.AlertError(
                      `Erro ao pegar url do arquivo ${f.file?.name}`
                    ),
                });
            }
        })
      )
      .subscribe();
  }

  deteleFile(f: MyFile) {
    this.storage.ref(f.path).delete();
    this.collection.doc(f.id).delete();
  }

  getArquivos(): Observable<MyFile[]> {
    return this.collection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const file: MyFile = a.payload.doc.data();
          file.id = a.payload.doc.id;
          return file;
        });
      })
    );
  }

  fillAttributes(f: FileEntry) {
    if (f.task) {
      f.percentage = f.task.percentageChanges();
      f.percentage_ionic = f.task
        .percentageChanges()
        .pipe(map((prc) => (prc ?? 0) / 100));
      f.finishid = from(f.task).pipe(map((s) => s.state == 'success'));
      f.bytesuploaded = f.task
        .snapshotChanges()
        .pipe(map((s) => s?.bytesTransferred));
    }
    if (f.state) {
      f.uploading = f.state.pipe(map((s) => s == 'running'));
      f.paused = f.state.pipe(map((s) => s == 'paused'));
      f.error = f.state.pipe(map((s) => s == 'error'));
      f.canceled = f.state.pipe(map((s) => s == 'canceled'));
    }
  }
}
