
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonService } from '../../services/person';

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
  private snackBar = inject(MatSnackBar);

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
        this.snackBar.open('Person added successfully!', 'Close', {
          duration: 3000
        });

        this.router.navigate(['/people']);
      },
      error: () => {
        this.snackBar.open('Unable to add person!', 'Close', {
          duration: 3000
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/people']);
  }
}
