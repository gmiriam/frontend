﻿import { Component } from '@angular/core';

@Component({
	selector: 'app',
	template: `
			<navbar></navbar>
			<div class="main-container">
				<ng-sidebar-container>
					<ng-sidebar [(opened)]="_opened">
						<ul>
							<li> <a routerLink="/admins" routerLinkActive="active"> Ver administradores </a></li>
							<li> <a routerLink="/teachers" routerLinkActive="active"> Ver profesores </a></li>
							<li> <a routerLink="/students" routerLinkActive="active"> Ver estudiantes </a></li>
							<li> <a routerLink="/subjects" routerLinkActive="active"> Ver asignaturas </a></li>
							<li> <a routerLink="/tasks" routerLinkActive="active"> Ver tareas </a></li>
						</ul>
					</ng-sidebar>
				</ng-sidebar-container>
				<div class="view-container">
					<router-outlet></router-outlet>
				</div>
			</div>
	`
})

export class AppComponent {
	private _opened: boolean = true;
}
