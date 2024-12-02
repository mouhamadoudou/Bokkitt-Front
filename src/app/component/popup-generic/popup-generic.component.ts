import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-generic',
  templateUrl: './popup-generic.component.html',
  styleUrl: './popup-generic.component.css'
})
export class PopupGenericComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupGenericComponent>,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.onClose();
    }, 4000);
  }

  onClose() {
    this.dialogRef.close("result");
  }
}
