import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Route, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardLogicService } from './services/dashboard-logic.service';
import { DashboardDataService } from './services/dashboard-data.service';
import { FindAShowModule } from '../../shared/modals/find-a-show-modal.module';

const routes: Route[] = [{ path: '', component: DashboardComponent }];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FindAShowModule
  ],
  providers: [DashboardLogicService, DashboardDataService]
})
export class DashboardModule {}
