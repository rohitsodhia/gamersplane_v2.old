import { Component, OnInit, ViewChild, ViewContainerRef, Input, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';

import { BasicRollDisplayComponent } from 'app/tools/roll-display/basic-roll-display/basic-roll-display.component';
import { StarWarsFFGRollDisplayComponent } from 'app/tools/roll-display/starwarsffg-roll-display/starwarsffg-roll-display.component';
import { FateRollDisplayComponent } from 'app/tools/roll-display/fate-roll-display/fate-roll-display.component';
import { FengShuiRollDisplayComponent } from 'app/tools/roll-display/feng-shui-roll-display/feng-shui-roll-display.component';

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
		let component;
		if (this.type === 'basic') {
			component = BasicRollDisplayComponent;
		} else if (this.type === 'starwarsffg') {
			component = StarWarsFFGRollDisplayComponent;
		} else if (this.type === 'fate') {
			component = FateRollDisplayComponent;
		} else if (this.type === 'fengshui') {
			component = FengShuiRollDisplayComponent;
		}
		let factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
		let componentRef: ComponentRef<Component> = this.rollDisplay.createComponent(factory);
		componentRef.instance['roll'] = this.roll;
	}

}
