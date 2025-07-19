import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from './data-service.service';

interface Property {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  days: number;
  checkInDate: string;
  checkOutDate: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  headline = 'Welcome to MyRentalApp!';
  subtext = 'Find your perfect rental property. Here are some available properties you can rent for one day:';

  currencies = ['INR', 'USD', 'EUR'];
  selectedCurrency = 'INR';
  currencyRates: any = { INR: 1, USD: 0.012, EUR: 0.011 };


  properties: Property[] = [
    {
      id: 1,
      title: 'Luxury Villa',
      description: 'Beautiful villa with ocean view, private pool, and modern amenities.',
      image: 'assets/images/Villa.jpg',
      price: 9000,
      days: 0,
      checkInDate: '',
      checkOutDate: ''
    },
    {
      id: 2,
      title: 'Modern Studio Apartment',
      description: 'Spacious apartment in the heart of the city with stunning city views.',
      image: 'assets/images/luxury.jpg',
      price: 5000,
      days: 0,
      checkInDate: '',
      checkOutDate: ''
    },
    {
      id: 3,
      title: 'Cozy Apartment',
      description: 'Charming cottage surrounded by nature, perfect for a peaceful getaway.',
      image: 'assets/images/apartment.jpg',
      price: 3000,
      days: 0,
      checkInDate: '',
      checkOutDate: ''
    }
  ];

  showBooking = false;
  selectedProperty: any = null;
  selectedDays: number = 1;
  selectedAmount: string = '';
  showUserDropdown = false;

  constructor(private router: Router,private dataService:DataServiceService) {}

  ngOnInit(): void {
  }

  getPrice(property: any): string {
    const rate = this.currencyRates[this.selectedCurrency] || 1;
    const total = property.price * property.days * rate;
    let symbol = '₹';
    if (this.selectedCurrency === 'USD') symbol = '$';
    if (this.selectedCurrency === 'EUR') symbol = '€';
    return symbol + total.toLocaleString();
  }

  openBooking(property: any) {
    this.selectedProperty = property;
    this.selectedDays = property.days;
    this.selectedAmount = this.getPrice(property);
    this.showBooking = true;
  }

  closeBooking() {
    this.showBooking = false;
  }

  viewBookings() {
    this.showBooking = false;
    this.saveBooking();
    this.router.navigate(['/my-bookings']);
  }

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  getUserInitial(): string {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      return user.email ? user.email.charAt(0).toUpperCase() : 'U';
    }
    return 'U';
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.showUserDropdown = false;
    this.router.navigate(['/login']);
  }

  goToMyBookings() {
    this.dataService.setDirectNavigation(true);
    this.router.navigate(['/my-bookings']);
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  calculateDays(property: Property): void {
    if (property.checkInDate && property.checkOutDate) {
      const checkIn = new Date(property.checkInDate);
      const checkOut = new Date(property.checkOutDate);
      
      if (checkOut > checkIn) {
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        property.days = daysDiff;
      } else {
        property.days = 0;
      }
    } else {
      property.days = 0;
    }
  }

  private saveBooking() {
    if (!this.selectedProperty) return;

    // Get current user
    const currentUserData = localStorage.getItem('currentUser');
    if (!currentUserData) return;
    
    const currentUser = JSON.parse(currentUserData);

    const booking = {
      id: Date.now(),
      userEmail: currentUser.email, // Add user email to booking
      propertyTitle: this.selectedProperty.title,
      propertyDescription: this.selectedProperty.description,
      propertyImage: this.selectedProperty.image,
      days: this.selectedDays,
      totalAmount: this.selectedProperty.price * this.selectedDays,
      bookingDate: new Date().toISOString(),
      status: 'confirmed',
      currency: this.selectedCurrency
    };

    // Get existing bookings
    const existingBookings = localStorage.getItem('userBookings');
    const bookings = existingBookings ? JSON.parse(existingBookings) : [];
    
    // Add new booking
    bookings.unshift(booking);
    
    // Save back to localStorage
    localStorage.setItem('userBookings', JSON.stringify(bookings));
  }
}
