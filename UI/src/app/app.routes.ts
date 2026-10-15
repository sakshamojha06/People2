import { Routes } from '@angular/router';
import { PeopleList } from './components/people-list/people-list';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'people',
        pathMatch: 'full'
    },
    {
        path: 'people',
        component: PeopleList
    }
];
