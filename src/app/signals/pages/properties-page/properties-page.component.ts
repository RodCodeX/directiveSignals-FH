import {
  Component,
  computed,
  effect,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css'],
})
export class PropertiesPageComponent implements OnInit, OnDestroy {
  counter = signal(10);

  user = signal<User>({
    id: 1,
    email: 'rodrigo.chuquimia@reqres.in',
    first_name: 'rodrigo',
    last_name: 'chuquimia',
    avatar: 'https://reqres.in/img/faces/1-image.jpg',
  });

  fullName = computed(() => {
    `${this.user()?.first_name} ${this.user()?.last_name}`;
  });

  userChangedEffect = effect(() => {
    console.log('userChangedEffect');
    console.log(`${this.user().first_name} - ${this.counter()}`);
  });

  ngOnInit(): void {
    setInterval(() => {
      this.counter.update((current) => current + 1);
      
      //! Eliminar el effect cuando counter es igual a 15
      if(this.counter() === 15){
        this.userChangedEffect.destroy();
      }
      
    }, 1000);
  }

  ngOnDestroy(): void {
    // this.userChangedEffect.destroy();
  }

  increaseBy(value: number): void {
    this.counter.update((current) => current + value);
  }

  onFielUpdate(filed: keyof User, value: string): void {
    // console.log(filed, value);
    // this.user.set({
    //   ...this.user(),
    //   [filed]:value
    // })

    // this.user.update(current => ({
    //   ...current,
    //   [filed]: value
    // }))

    this.user.update((current: any) => {
      switch (filed) {
        case 'email':
          current.email = value;
          break;
        case 'avatar':
          current.avatar = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
        case 'id':
          current.id = Number(value);
          break;
      }
      return current;
    });
  }
}
