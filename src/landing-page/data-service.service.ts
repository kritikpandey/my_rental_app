import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private isdirectNavigation:boolean =false;
  constructor() { }

  setDirectNavigation(data:any){
    this.isdirectNavigation =data;
  }
  getDirectNavigation(){
    return this.isdirectNavigation;
  }
}
