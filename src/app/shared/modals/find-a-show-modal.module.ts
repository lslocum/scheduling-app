import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { SearchModule } from '../components/search/search.module';

import { FindAShowComponent } from './find-a-show-modal.component';

@NgModule({
  declarations: [FindAShowComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule, SearchModule],
})
export class FindAShowModule {}
