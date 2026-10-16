import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonService } from '../../services/person';
import { Person } from '../../models/person';

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
  private snackBar = inject(MatSnackBar);

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
        this.snackBar.open('Unable to load person!', 'Close', {
          duration: 3000
        });
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
        this.snackBar.open('Person updated successfully!', 'Close', {
          duration: 3000
        });

        this.router.navigate(['/people']);
      },
      error: () => {
        this.snackBar.open('Unable to update person!', 'Close', {
          duration: 3000
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/people']);
  }
}