import { DialogRef } from "@angular/cdk/dialog";
import { Component } from "@angular/core";



@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html'
})


export class DeleteDialogComponent {

    constructor(public dialogRef: DialogRef<DeleteDialogComponent>) {}

    close() {
        this.dialogRef.close();
    }

}