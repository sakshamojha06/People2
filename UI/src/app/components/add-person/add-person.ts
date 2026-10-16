
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService } from '../../services/person';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-person.html',
  styleUrl: './add-person.css'
})
export class AddPerson {

  private personService = inject(PersonService);
  private router = inject(Router);
  private notifications = inject(NotificationService);

  person = {
    name: '',
    dateOfBirth: ''
  };

  addPerson(): void {
    if (!this.person.name.trim() || !this.person.dateOfBirth) {
      return;
    }

    this.personService.Create({
      id: 0,
      name: this.person.name.trim(),
      dateOfBirth: this.person.dateOfBirth
    }).subscribe({
      next: () => {
        this.notifications.show('Person added successfully.', 'success');
        this.router.navigate(['/people']);
      },
      error: () => {
        this.notifications.show('Unable to add person.', 'danger');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/people']);
  }
}
