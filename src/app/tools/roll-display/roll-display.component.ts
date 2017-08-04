import { Component, OnInit, ViewChild, ViewContainerRef, Input, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';

import { BasicRollDisplayComponent } from './basic-roll-display/basic-roll-display.component';
import { StarwarsffgRollDisplayComponent } from './starwarsffg-roll-display/starwarsffg-roll-display.component';
import { FateRollDisplayComponent } from './fate-roll-display/fate-roll-display.component';

@Component({
	selector: 'gp-roll-display',
	templateUrl: './roll-display.component.html',
	styleUrls: ['./roll-display.component.less']
})
export class RollDisplayComponent implements OnInit {

	@ViewChild('rollDisplay', { read: ViewContainerRef }) rollDisplay;

	@Input() type: string;
	@Input() roll: { [key: string]: any };

	constructor(private resolver: ComponentFactoryResolver) { }

	ngOnInit() {
		let factory: ComponentFactory<any> = null;
		if (this.type === 'basic') {
			factory = this.resolver.resolveComponentFactory(BasicRollDisplayComponent);
		} else if (this.type === 'starwarsffg') {
			factory = this.resolver.resolveComponentFactory(StarwarsffgRollDisplayComponent);
		} else if (this.type === 'fate') {
			factory = this.resolver.resolveComponentFactory(FateRollDisplayComponent);
		}
		let componentRef: ComponentRef<Component> = this.rollDisplay.createComponent(factory);
		componentRef.instance['roll'] = this.roll;
	}

}
