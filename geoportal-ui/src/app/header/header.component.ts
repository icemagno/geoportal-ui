import { Component } from '@angular/core';
import { NavbarTasksComponent } from '../navbar-tasks/navbar-tasks.component';
import { NavbarUserMenuComponent } from '../navbar-user-menu/navbar-user-menu.component';
import { SolucionadoresMenuComponent } from '../solucionadores-menu/solucionadores-menu.component';
import { FerramentasMenuComponent } from '../ferramentas-menu/ferramentas-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavbarTasksComponent,
    NavbarUserMenuComponent,
    SolucionadoresMenuComponent,
    FerramentasMenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
