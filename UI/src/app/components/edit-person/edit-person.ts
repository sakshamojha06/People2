import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person';
import { Person } from '../../models/person';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-edit-person',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-person.html',
  styleUrl: './edit-person.css'
})
export class EditPerson implements OnInit {

  private personService = inject(PersonService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notifications = inject(NotificationService);

  person: Person = {
    id: 0,
    name: '',
    dateOfBirth: ''
  };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.personService.getById(id).subscribe({
      next: (data) => {
        this.person = data;
        this.person.dateOfBirth = data.dateOfBirth.substring(0, 10);
      },
      error: () => {
        this.notifications.show('Unable to load person.', 'danger');
        this.router.navigate(['/people']);
      }
    });
  }

  updatePerson(): void {
    if (!this.person.name.trim() || !this.person.dateOfBirth) {
      return;
    }

    this.personService.Update(this.person.id, this.person).subscribe({
      next: () => {
        this.notifications.show('Person updated successfully.', 'success');
        this.router.navigate(['/people']);
      },
      error: () => {
        this.notifications.show('Unable to update person.', 'danger');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/people']);
  }
}