import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css'],
})
export class UserInfoPageComponent implements OnInit {
  private _userService = inject(UserService);
  userId = signal(1);

  currentUser = signal<User | undefined>(undefined);
  userWasFound = signal(true);
  fullName = computed<string>(() => {
    if(!this.currentUser()) return 'Usuario no encontrado'
    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`
  })

  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  loadUser(id: number): void {
    if (id <= 0) return; // Validacion que no sea el id igual a cero "0"

    this.userId.set(id);
    this.currentUser.set(undefined);

    // this._userService.getUserById(id).subscribe((user) => {
    //   this.currentUser.set(user);
    // });

    this._userService.getUserById(id).subscribe({
      next: (user) => {
        this.currentUser.set(user);
        this.userWasFound.set(true);
      },
      error:() => {
        this.currentUser.set(undefined)
        this.userWasFound.set(false);
      },
    });
  }
}
