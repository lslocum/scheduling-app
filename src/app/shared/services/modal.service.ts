import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { FindAShowComponent } from '../modals/find-a-show-modal.component';
import { GameShow } from '../models/game-show';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  closeOpenModals(): void {
    // There can only be 1
    this.dialog.closeAll();
  }

  openFindAShowModal(shows: GameShow[], userShows: GameShow[]): MatDialogRef<FindAShowComponent> {
    this.closeOpenModals();
    return this.dialog.open(FindAShowComponent, { data: { shows, userShows } });
  }
}
