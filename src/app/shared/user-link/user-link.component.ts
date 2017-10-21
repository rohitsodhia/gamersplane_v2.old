import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gp-user-link',
  templateUrl: './user-link.component.html',
  styleUrls: ['./user-link.component.css']
})
export class UserLinkComponent implements OnInit {

	@Input() user: {};

	constructor() { }

	ngOnInit() {
	}

}
