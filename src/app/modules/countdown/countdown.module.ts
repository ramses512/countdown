import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountdownRoutingModule } from './countdown-routing.module';
import { CountdownComponent } from './page/countdown.component';

@NgModule({
  declarations: [CountdownComponent],
  imports: [CommonModule, CountdownRoutingModule, SharedModule],
})
export class CountdownModule {}
