import { Component, signal } from '@angular/core';

interface MenuItem {
  title: string;
  router: string;
}

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {

  // Version normal
  // menuItems: MenuItem[] = [
  //   { title: 'Contador', router: 'counter' },
  //   { title: 'Usuario', router: 'user-info' },
  //   { title: 'Mutaciones', router: 'properties' },
  // ];

  menuItems = signal<MenuItem[]>([
    { title: 'Contador', router: 'counter' },
    { title: 'Usuario', router: 'user-info' },
    { title: 'Mutaciones', router: 'properties' },
  ]);
}
