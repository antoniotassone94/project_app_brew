import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  imports:[
    CommonModule,
    MatDialogModule,
    MatIconModule
  ],
  exports:[
    MatDialogModule,
    MatIconModule
  ]
})

export class MaterialModule{}
