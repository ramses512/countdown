import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/service/auth.service';
import { User } from '@data/schema/user';
import { UserService } from '@data/service/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}
  public user$: Observable<User>;
  public dateObj: any;
  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    this.userService.getLastLogin(`/user/${id}`).subscribe((user) => {
      this.dateObj = this.calculateDiff(user);
    });
  }
  calculateDiff(data) {
    if (data.lastLogin) {
      let date = new Date(data.lastLogin);
      let currentDate = new Date();

      let delta = Math.abs(date.getTime() - currentDate.getTime()) / 1000;

      const days = Math.floor(delta / 86400);
      delta -= days * 86400;

      const hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;

      const minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;

      const seconds = (delta % 60).toFixed(0);

      return { days, hours, minutes, seconds };
    }
    return { days:0, hours:0, minutes:0, seconds:0 }
  }
  logout() {
    this.authService.logout();
  }
}
