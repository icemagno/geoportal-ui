import { Component } from '@angular/core';
import { SolucionadoresMenuService } from '../services/solucionadores-menu-service';

@Component({
  selector: 'app-solucionadores-menu',
  standalone: true,
  imports: [],
  templateUrl: './solucionadores-menu.component.html',
  styleUrl: './solucionadores-menu.component.css'
})
export class SolucionadoresMenuComponent {
  private responder: SolucionadoresMenuService;

  constructor() {
    this.responder = new SolucionadoresMenuService();
  }

  onBtn000Click() { this.responder.onBtn000Click(); }
  onBtn001Click() { this.responder.onBtn001Click(); }
  onBtn002Click() { this.responder.onBtn002Click(); }
  onBtn003Click() { this.responder.onBtn003Click(); }
  onBtn004Click() { this.responder.onBtn004Click(); }
  onBtn005Click() { this.responder.onBtn005Click(); }
  onBtn006Click() { this.responder.onBtn006Click(); }
  onBtn007Click() { this.responder.onBtn007Click(); }
  onBtn008Click() { this.responder.onBtn008Click(); }
  onBtn009Click() { this.responder.onBtn009Click(); }
  onBtn010Click() { this.responder.onBtn010Click(); }
}