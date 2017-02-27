import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Teacher} from './teacher';

@Component({
	selector: 'teacherList',
	templateUrl: 'src/app/html/teacher/list.html'
})

export class TeacherList {
	params;
	teacherList: Teacher[];
	teacherUrl: string;

	constructor(public router: Router, private globalsService: GlobalsService) {

		this.teacherUrl = globalsService.apiUrl + 'user';
		this.getTeachers();
	}

	getTeachers() {

		var url = this.teacherUrl + '?role=teacher';

		this.globalsService.request('get', url, {
			urlParams: this.params
		}).subscribe(
			response => {
				var content = response.json().content;
				this.teacherList = content;
			},
			error => {
				console.error(error.text());
			});
	}

	addItem(evt) {
		this.router.navigate(['teacher', "new"]);
	}

	editItem(evt, id) {
		this.router.navigate(['teacher', id]);
	}

	deleteItem(evt, id) {

		var confirmed = window.confirm("Está seguro?");

		if (!confirmed) {
			return;
		}

		this.globalsService.request('delete', this.teacherUrl + '/' + id, {
			urlParams: this.params
		}).subscribe(
			response => {
				this.getTeachers();
			},
			error => {
				console.error(error.text());
			});
	}
}
