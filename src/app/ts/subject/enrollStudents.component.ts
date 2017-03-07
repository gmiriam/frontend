import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';

@Component({
	selector: 'enrollStudents',
	templateUrl: 'src/app/html/subject/enrollStudents.html'
})

export class EnrollStudents {
	params;
	subjectId: string;
	enrollStudentsForm: FormGroup;
	studentUrl: string;
	enrolledStudentsUrl: string;
	enrollStudentsUrl: string;
	unenrollStudentsUrl: string;
	studentList;
	enrolledStudentList;
	originalEnrolledStudentIds;
	enrolledStudentIds;
	unenrolledStudentIds = [];

	constructor(public router: Router, fb: FormBuilder, private globalsService: GlobalsService,
		private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.subjectId = this.params['subjectid'];

		this.enrolledStudentsUrl = globalsService.apiUrl + 'user?enrolledsubjectid=' + this.subjectId;
		this.studentUrl = globalsService.apiUrl + 'user?role=student,teacher';
		this.enrollStudentsUrl = globalsService.apiUrl + 'subject/enrollstudents';
		this.unenrollStudentsUrl = globalsService.apiUrl + 'subject/unenrollstudents';

		this.enrollStudentsForm = fb.group({
			students: ["", Validators.required]
		});

		this.getEnrolledStudents();
	}

	onChangeEnrolledStudents(event) {

		this.enrolledStudentIds = event;
	}

	onSelectEnrolledStudent(event) {

		var index = this.unenrolledStudentIds.indexOf(event);
		if (index !== -1) {
			this.unenrolledStudentIds.splice(index, 1);
		}
	}

	onRemoveEnrolledStudent(event) {

		if (this.unenrolledStudentIds.indexOf(event) === -1 && this.originalEnrolledStudentIds.indexOf(event) !== -1) {
			this.unenrolledStudentIds.push(event);
		}
	}

	onSubmit(event) {

		this.save();
	}

	getEnrolledStudents() {

		this.globalsService.request('get', this.enrolledStudentsUrl, {
			urlParams: this.params
		}).subscribe(response => {

			var content = response.json().content;
			if (!content) {
				return;
			}

			this.originalEnrolledStudentIds = content.map((function(currentValue, index, array) {

				return currentValue._id;
			}).bind(this));
			this.enrolledStudentIds = this.originalEnrolledStudentIds;

			this.getStudents();
		}, error => {

			this.globalsService.showError(error);
		});
	}

	getStudents() {

		this.globalsService.request('get', this.studentUrl, {
			urlParams: this.params
		}).subscribe(response => {

			var content = response.json().content;
			if (!content) {
				return;
			}

			this.enrolledStudentList = [];

			this.studentList = content.map((function(currentValue, index, array) {

				var studentObj = {
						id: currentValue._id,
						text: currentValue.surname + ", " + currentValue.firstName
					};

				if (this.originalEnrolledStudentIds && this.originalEnrolledStudentIds.indexOf(studentObj.id) !== -1) {
					this.enrolledStudentList.push(studentObj);
				}

				return studentObj;
			}).bind(this));
		}, error => {

			this.globalsService.showError(error);
		});
	}

	save() {

		if (this.unenrolledStudentIds.length) {
			this.saveUnenrolledStudents({
				subject: this.subjectId,
				students: this.unenrolledStudentIds
			});
		} else if (this.enrolledStudentIds.length) {
			this.saveEnrolledStudents({
				subject: this.subjectId,
				students: this.enrolledStudentIds
			});
		}
	}

	saveUnenrolledStudents(value) {

		let body = JSON.stringify({ data: value });

		this.globalsService.request('post', this.unenrollStudentsUrl, {
			urlParams: this.params,
			body: body
		}).subscribe(response => {

			this.unenrolledStudentIds = [];

			if (this.enrolledStudentIds.length) {
				this.saveEnrolledStudents({
					subject: this.subjectId,
					students: this.enrolledStudentIds
				});
			}
		}, error => {

			this.globalsService.showError(error);
		});
	}

	saveEnrolledStudents(value) {

		let body = JSON.stringify({ data: value });

		this.globalsService.request('post', this.enrollStudentsUrl, {
			urlParams: this.params,
			body: body
		}).subscribe(response => {

			this.originalEnrolledStudentIds = this.enrolledStudentIds;
			this.finishEdition();
		}, error => {

			this.globalsService.showError(error);
		});
	}

	finishEdition(event?) {

		event && event.preventDefault();
		this.router.navigate(['subject', this.subjectId]);
	}
}
