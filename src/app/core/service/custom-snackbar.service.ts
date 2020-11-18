import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CustomSnackbarService {
  constructor(public snackBar: MatSnackBar, private zone: NgZone) {}

  public open(
    message: string,
    action: string = 'Success',
    classColor: string = 'success',
    duration: number = 20000
  ): void {
    this.zone.run(() => {
      const config = new MatSnackBarConfig();
      config.duration = duration;
      config.horizontalPosition = 'right';
      config.verticalPosition = 'top';
      this.snackBar.open(message, action, config);
    });
  }
}
