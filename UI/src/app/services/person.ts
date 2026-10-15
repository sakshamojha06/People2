import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/person';

@Injectable({
    providedIn: 'root'
})
export class PersonService {
    private http = inject(HttpClient);

    private apiUrl = 'http://localhost:5215/api/Person';

    getAll(): Observable<Person[]> {
        return this.http.get<Person[]>(this.apiUrl);
    }

    getById(id: number): Observable<Person> {
        return this.http.get<Person>(`${this.apiUrl}/${id}`);
    }

    Create(person: Person): Observable<any> {
        return this.http.post(this.apiUrl, person);
    }

    Update(id: number, person: Person): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, person);
    }

    Delete(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
