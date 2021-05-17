import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { GameShow } from '../models/game-show';

@Component({
  templateUrl: './find-a-show-modal.component.html',
  styleUrls: ['./find-a-show-modal.component.scss']
})
export class FindAShowComponent implements OnInit {
  shows: GameShow[];
  userShows: GameShow[];
  private allShows: GameShow[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<FindAShowComponent>
  ) {}

  ngOnInit(): void {
    this.shows = this.data.shows;
    this.allShows = this.data.shows;
    this.userShows = [...this.data.userShows] ?? [];
  }

  cancel(): void {
    this.dialogRef.close();
  }

  closeModal(): void {
    this.dialogRef.close(this.userShows);
  }

  applyFilter(filter: string): void {
    if (!filter) {
      this.shows = this.allShows;
    } else {
      this.shows = this.allShows.filter(
        show =>
          show.title
            .trim()
            .toLowerCase()
            .indexOf(filter.trim().toLowerCase()) > -1
      );
    }
  }

  addAShow(show: GameShow): void {
    const showIndex = this.userShows.findIndex(s=> s.showId === show.showId);
    if(showIndex > -1) {
      this.userShows.splice(showIndex, 1);
    } else{
    this.userShows.push(show);
  }}
}
