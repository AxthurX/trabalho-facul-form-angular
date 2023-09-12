import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.scss'],
})
export class DropZoneComponent implements OnInit {
  constructor() {}
  isDraggingOver = false;
  @Output() droppedFiles = new EventEmitter<FileList>();
  ngOnInit() {}

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.droppedFiles.emit(event.dataTransfer?.files);
  }

  onChange(files: FileList | null) {
    this.droppedFiles.emit(files ?? undefined);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOver = false;
  }
}
