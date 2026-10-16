import { Component, inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { PersonService } from '../../services/person';
import { Person } from '../../models/person';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [DatePipe, RouterLink, MatDialogModule],
  selector: 'app-people-list',
  styleUrl: './people-list.css',
  templateUrl: './people-list.html',
})
export class PeopleList implements OnInit {

  private personService = inject(PersonService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<unknown>;

  people = signal<Person[]>([]);
  loading = signal(false);
  errorMessage = signal('');

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.personService.getAll().subscribe({
      next: (data) => {
        this.people.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.errorMessage.set('Unable to load people');
        this.loading.set(false);
      }
    });
  }

  deletePerson(id: number): void {
    this.dialog.open(this.deleteDialog)
      .afterClosed()
      .subscribe(result => {

        if (result) {
          this.personService.Delete(id).subscribe({
            next: () => {
              this.snackBar.open('Person deleted successfully!', 'Close', {
                duration: 3000
              });
              this.loadPeople();
            },
            error: () => {
              this.snackBar.open('Unable to delete person!', 'Close', {
                duration: 3000
              });
            }
          });
        }

      });
  }
}