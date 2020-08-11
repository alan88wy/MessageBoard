import { Component } from '@angular/core';

@Component({
  selector: 'nav',
  template: `
    <mat-toolbar color='primary' class='nav'>
      <button mat-button routerLink='/'>Message Board</button>
      <button mat-button routerLink='/messages'>Messages</button>
    </mat-toolbar>
  `
})
export class NavComponent {

  constructor() { };
}
