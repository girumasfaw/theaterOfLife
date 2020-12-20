import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule  } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [
    MatDatepickerModule,
  ],
    exports: [
        MatProgressBarModule,
        MatDividerModule,
        MatIconModule,
        MatExpansionModule,
        MatTooltipModule,
        MatBadgeModule,
        MatRippleModule,
        MatButtonModule,
        MatDialogModule,
        MatTableModule,
        MatCheckboxModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatSnackBarModule
    ]
  })
  export class AppMaterialModule { }
