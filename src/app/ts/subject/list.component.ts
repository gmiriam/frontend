import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from '../globals.service';
import {Subject} from './subject';

@Component({
	selector: 'subjectList',
	templateUrl: 'src/app/html/subject/list.html'
})

export class SubjectList {
	params;
	subjectList: Subject[];
	subjectUrl: string;

	constructor(private router: Router, private route: ActivatedRoute, private globalsService: GlobalsService,
		private localStorageService: LocalStorageService) {

		this.subjectUrl = globalsService.apiUrl + 'subject';

		this.getSubjects();
	}

	getSubjects() {

		var url = this.subjectUrl + '?userid=' + this.localStorageService.get('userId');

		this.globalsService.request('get', url, {
			urlParams: this.params
		}).subscribe(
			response => {
				var content = response.json().content;
				this.subjectList = content;
			},
			error => {
				console.error(error.text());
			});
	}

	viewItem(evt, id) {

		this.router.navigate([id], { relativeTo: this.route });
	}

	addItem(evt) {

		this.router.navigate(["new", "edit"], { relativeTo: this.route });
	}
}
