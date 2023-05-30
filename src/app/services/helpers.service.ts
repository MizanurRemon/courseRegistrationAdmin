import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  byteToImage(image: any): any {
    return "data:image/png;base64," + image;
  }
}
