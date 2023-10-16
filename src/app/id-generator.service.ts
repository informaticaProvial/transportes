import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {
  private lastId = 0;

  generateId(): number {
    return ++this.lastId;
  }
}
