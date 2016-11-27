﻿import {Home} from './home';
//import {Login} from './login';
//import {Signup} from './signup';

import {Tasks} from './tasks';
import {Courses} from './courses';
import {Admins} from './admins';
import {Teachers} from './teachers';
import {Students} from './students';
import {Subjects} from './subjects';
import {Deliveries} from './deliveries';
import {Scores} from './scores';

export const routes = [{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},{
  path: 'home',
  component: Home
},
//{ path: 'login', component: Login },
//{ path: 'signup', component: Signup },
{
  path: 'tasks',
  component: Tasks
},{
  path: 'courses',
  component: Courses
},{
  path: 'admins',
  component: Admins
},{
  path: 'teachers',
  component: Teachers
},{
  path: 'students',
  component: Students
},{
  path: 'subjects',
  component: Subjects
},{
  path: 'deliveries',
  component: Deliveries
},{
  path: 'scores',
  component: Scores
}];