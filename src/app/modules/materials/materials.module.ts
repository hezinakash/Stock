import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule
  ],
  exports: [
    MatToolbarModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule
  ]
})
export class MaterialsModule {}
