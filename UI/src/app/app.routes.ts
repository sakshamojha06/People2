import { Routes } from '@angular/router';
import { PeopleList } from './components/people-list/people-list';
import { AddPerson } from './components/add-person/add-person';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'people',
        pathMatch: 'full'
    },
    {
        path: 'people',
        component: PeopleList
    },
    {
        path: 'add-people',
        component: AddPerson
    }
];
