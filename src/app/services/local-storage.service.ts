import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorage = inject(DOCUMENT).defaultView?.localStorage;

  constructor() { }

  get(key: string){
    const item = this.localStorage?.getItem(key);
    if(!item) return null;
    return JSON.parse(item);
  }

  set(key: string, value: string){
    this.localStorage?.setItem(key, JSON.stringify(value));
  }
}
