import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsRoutingModule } from './tools-routing.module';
import { SharedModule } from './../shared/shared.module';

import { DiceService } from '../shared/dice.service';

import { DiceComponent } from './dice/dice.component';
import { RollDisplayComponent } from './roll-display/roll-display.component';
import { StarWarsFFGDieComponent } from './starwarsffg-die/starwarsffg-die.component';
import { BasicRollDisplayComponent } from './roll-display/basic-roll-display/basic-roll-display.component';
import { StarwarsffgRollDisplayComponent } from './roll-display/starwarsffg-roll-display/starwarsffg-roll-display.component';
import { FateRollDisplayComponent } from './roll-display/fate-roll-display/fate-roll-display.component';
import { FateDieComponent } from './fate-die/fate-die.component';
import { FengShuiDisplayComponent } from './roll-display/feng-shui-display/feng-shui-display.component';

@NgModule({
	imports: [
		CommonModule,
		ToolsRoutingModule,
		SharedModule
	],
	declarations: [
		DiceComponent,
		RollDisplayComponent,
		StarWarsFFGDieComponent,
		BasicRollDisplayComponent,
		StarwarsffgRollDisplayComponent,
		FateRollDisplayComponent,
		FateDieComponent,
		FengShuiDisplayComponent,
	],
	providers: [
		DiceService
	],
	entryComponents: [
		BasicRollDisplayComponent,
		StarwarsffgRollDisplayComponent,
		FateRollDisplayComponent,
	]
})
export class ToolsModule { }
