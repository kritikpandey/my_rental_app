import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-booking-popup',
  templateUrl: './booking-popup.component.html',
  styleUrls: ['./booking-popup.component.css']
})
export class BookingPopupComponent implements OnInit, OnDestroy {
  @Input() property: any;
  @Input() days: number = 1;
  @Input() amount: string = '';
  @Input() currency: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() viewBookings = new EventEmitter<void>();

  countdown: number = 5;
  private countdownInterval: any;

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  private startCountdown() {
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
        this.viewBookings.emit();
      }
    }, 1000);
  }
} 