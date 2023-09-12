import { AngularFireUploadTask } from '@angular/fire/compat/storage/task';
import { Observable } from 'rxjs';

export interface FileEntry {
  file: File | null;
  task: AngularFireUploadTask | null;
  percentage: Observable<number | undefined> | null;
  percentage_ionic: Observable<number> | null;
  uploading: Observable<boolean> | null;
  finishid: Observable<boolean> | null;
  paused: Observable<boolean> | null;
  error: Observable<boolean> | null;
  canceled: Observable<boolean> | null;
  bytesuploaded: Observable<number | undefined> | null;
  state: Observable<string> | null;
}
