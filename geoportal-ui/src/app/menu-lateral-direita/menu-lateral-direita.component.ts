import { Component,  Input, OnInit } from '@angular/core';
import { MenuLateralDireitaService } from '../services/menu-lateral-direita-service';

@Component({
  selector: 'app-menu-lateral-direita',
  templateUrl: './menu-lateral-direita.component.html',
  styleUrls: ['./menu-lateral-direita.component.scss']
})
export class MenuLateralDireitaComponent implements OnInit {

  @Input() isMenuAberto = false;

  public recolhido: boolean = false;
  public submenuRecolhido: boolean = true;

  constructor(
    public selfService: MenuLateralDireitaService
  ) { }

  ngOnInit(): void {

  }


}
