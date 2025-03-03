import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventI } from '../models/event-interface';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private apiURL = 'http://localhost:8080/events';

  constructor(private http: HttpClient) {}

  public async createEvent(body: EventI): Promise<any> {
    return await firstValueFrom(this.http.post<Event[]>(this.apiURL, body));
  }

  public async getAllEvents(): Promise<any> {
    return await firstValueFrom(this.http.get<Event[]>(this.apiURL));
  }

  public async getEvent(id: Number): Promise<any> {
    return await firstValueFrom(this.http.get<Event[]>(this.apiURL + `/${id}`));
  }

  public async updateEvent(id: Number, body: EventI): Promise<any> {
    return await firstValueFrom(
      this.http.put<Event[]>(`${this.apiURL}/${id}`, body)
    );
  }

  public async deleteEvent(id: number): Promise<any> {
    return await firstValueFrom(
      this.http.delete(`${this.apiURL}/${id}`)
    );
  }
  
}
