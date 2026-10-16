import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
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

  people: Person[] = [];
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.loading = true;
    this.errorMessage = '';

    this.personService.getAll().subscribe({
      next: (data) => {
        this.people = data;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Unable to load people';
        this.loading = false;
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