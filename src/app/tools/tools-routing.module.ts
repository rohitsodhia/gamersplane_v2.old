import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiceComponent } from './dice/dice.component';

const routes: Routes = [
	{
		path: 'tools',
		children: [
			{
				path: 'dice',
				component: DiceComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ToolsRoutingModule { }
