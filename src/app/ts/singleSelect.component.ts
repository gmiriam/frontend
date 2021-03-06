import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'singleSelect',
	templateUrl: 'src/app/html/singleSelect.html'
})

export class SingleSelectComponent {
	@Input() public items:Array<any>;
	@Output() change: EventEmitter<Array<any>> = new EventEmitter();
	@Output() select: EventEmitter<Array<any>> = new EventEmitter();
	@Output() remove: EventEmitter<Array<any>> = new EventEmitter();
	@Input() private value:any;

	public onChange(value:any):void {

		this.value = [value];
		var serializedSelection = this._getSerializedSelection(value);

		serializedSelection && this.change.next(serializedSelection);
	}

	public onSelect(value:any):void {

		this.select.next(value.id);
	}

	public onRemove(value:any):void {

		this.remove.next(value.id);
	}

	_getSerializedSelection(selection) {

		if (!selection) {
			return null;
		}

		return selection.id;
	}
}
