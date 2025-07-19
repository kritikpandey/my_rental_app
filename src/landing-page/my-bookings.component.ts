import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from './data-service.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  bookings: any[] = [];
  totalSpent: number = 0;
  totalDays: number = 0;
  currentUser: any = null;
  isDirectNavigation = false;
  constructor(private dataService:DataServiceService) {
  }
  ngOnInit() {
    this.loadCurrentUser();
    this.loadUserBookings();
    this.calculateTotals();
  if (this.bookings.length == 0) {
   this.isDirectNavigation = this.dataService.getDirectNavigation();
  }
  }

  loadCurrentUser() {
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
      this.currentUser = JSON.parse(currentUserData);
    }
  }

  loadUserBookings() {
    // Load bookings from localStorage
    const savedBookings = localStorage.getItem('userBookings');
    if (savedBookings && this.currentUser) {
      const allBookings = JSON.parse(savedBookings);
      // Filter bookings to only show current user's bookings
      this.bookings = allBookings.filter((booking: any) => 
        booking.userEmail === this.currentUser.email
      );
    }
  }

  calculateTotals() {
    this.totalSpent = this.bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
    this.totalDays = this.bookings.reduce((sum, booking) => sum + booking.days, 0);
  }

  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'completed': return '#6b7280';
      default: return '#6b7280';
    }
  }

  goBack() {
    window.history.back();
  }
} 