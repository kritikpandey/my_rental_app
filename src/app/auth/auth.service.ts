import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly key = "users";

  constructor() { }
  
  signup(email: string, password: string): void {
    // Get existing users or create empty array
    const existingUsers = localStorage.getItem(this.key);
    const users = existingUsers ? JSON.parse(existingUsers) : [];
    
    // Check if user already exists
    const userExists = users.some((user: any) => user.email === email);
    
    if (!userExists) {
      // Add new user
      users.push({ email, password });
      localStorage.setItem(this.key, JSON.stringify(users));
      
      // Also store current user session
      localStorage.setItem('currentUser', JSON.stringify({ email, password }));
    } else {
      throw new Error('User with this email already exists');
    }
  }
}
