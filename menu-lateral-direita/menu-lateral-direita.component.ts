import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit, Injector } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CesiumService, DrawHelperService } from 'src/app/shared/services';
import { QueryLayerService } from 'src/app/shared/services/query-layer.service';
import { FeatureDataStore } from 'src/app/shared/store/feature-data.store';
import { ActiveToolType } from '../../../shared/model/active-tool-type.enum';
import { MessageService } from '../../../shared/services/message.service';
import { MapValuesStore } from '../../../shared/store';
import { ActiveToolsStore } from '../../../shared/store/active-tools.store';
import { Menu, MenuLateralDireitaService, Submenu } from 'src/app/shared/services/menu-lateral-direita.service';
import { InterrogacaoService } from 'src/app/home/services/interrogacao.service';
import { EstruturaLogisticaService } from '../../services/estrutura-logistica.service';

@Component({
  selector: 'app-menu-lateral-direita',
  templateUrl: './menu-lateral-direita.component.html',
  styleUrls: ['./menu-lateral-direita.component.scss']
})
export class MenuLateralDireitaComponent implements OnInit {

  @Input() isMenuAberto = false;

  public recolhido: boolean = false;
  public submenuRecolhido: boolean = true;

  public Menu = Menu;
  public Submenu = Submenu;

  private interrogarSubscriptions = new Subscription();

  private fullscreen: boolean = false;
  private docElem: any;

  private interval;

  constructor(
    @Inject(DOCUMENT) private document: any,
    public selfService: MenuLateralDireitaService,
    private mapValuesStore: MapValuesStore,
    private activeToolsStore: ActiveToolsStore,
    private featureDataStore: FeatureDataStore,
    private queryLayerService: QueryLayerService,
    private cesiumService: CesiumService,
    private drawHelperService: DrawHelperService,
    private messageService: MessageService,
    private injector: Injector,
    private estruturaLogisticaService: EstruturaLogisticaService,
  ) { }

  private interrogacaoService:InterrogacaoService = this.injector.get(InterrogacaoService);

  ngOnInit(): void {
    this.prepararVarsTelaCheia();
  }

  /*** INTERROGAR ***/

  public toggleInterrogar(): void {
    this.interrogacaoService.toggleInterrogar()
  }

  private unsubscribeQueryTool(): void {
    this.interrogarSubscriptions.unsubscribe();
    this.interrogarSubscriptions = new Subscription();
  }

  private subscribeQueryTool(active): void {
    this.interrogarSubscriptions.add(
      this.queryLayerService.featuresResponse.pipe(
        filter(response => active && response)
      ).subscribe(response => this.resolveFeaturesResponse(response))
    );
    this.interrogarSubscriptions.add(
      this.queryLayerService.layerFeaturesResponse.pipe(
        filter(response => active && response)
      ).subscribe(response => this.resolveLayerResponse(response))
    );
  }

  private resolveFeaturesResponse(response): void { this.featureDataStore.add(response); }

  private resolveLayerResponse(response): void {
    const fc = response.featureCollection;
    const layerData = response.layerData;
    if(!(fc && layerData)) return;
    this.messageService.showInfo(`Carregando informação para a camada ${layerData.layer.properties.layerName}.`);
    const features = fc.features;
    const layerName = layerData.layer.properties.layerName;
    if (features.length > 0) { this.continueResolving(features, layerName); }
    else { this.messageService.showInfo(`Nenhuma informação encontrada para a camada ${layerName}.`); }
  }

  private continueResolving(features, layerName) {
    features.forEach((f, i) => {
      const featureData = f.properties.atributos ? JSON.parse(f.properties.atributos) : f.properties;
      featureData.title = this.getFeatureDataTitle(layerName, featureData, features, i);
      this.featureDataStore.add(featureData);
    });
  }

  private getFeatureDataTitle(layerName, featureData, features, i): string {
    const defaultPropertyTitles = ['nome', 'sigla'];
    let title = layerName;
      let found = false;
      defaultPropertyTitles.forEach(t => {
        if (t in featureData && featureData[t]) {
          title += ` ${featureData[t]}`;
          found = true;
          return;
        }
      });
      if (!found && features.length > 1) { title += ` ${i + 1}`; }
    return title;
  }

  /*** ESTRUTURA LOGISTICA ***/

  // public toggleEstruturaLogistica(): void {
  //   this.selfService.toggle(Menu.estruturaLogistica);
  //   const isActive: boolean = this.selfService.isActive(Menu.estruturaLogistica);
  //   if (isActive) {
  //     // this.queryLayerService.activateQueryTool();
  //     // this.subscribeQueryTool(isActive);
  //     this.estruturaLogisticaService.drawPolygonParaEstruturaLogistica();
  //   } else {
  //     // this.featureDataStore.clear();
  //     // this.queryLayerService.deactivateQueryTool();
  //     // this.unsubscribeQueryTool();
  //     this.estruturaLogisticaService.closeEstruturaLogistica();
  //   }
  // }

  /*** TELA CHEIA ***/

  private prepararVarsTelaCheia(): void {
    this.docElem = document.documentElement;
    this.checkScreenMode();
  }

  private checkScreenMode(): void { this.fullscreen = this.document.fullscreenElement; }

  public toggleTelaCheia(): void {
    if (!this.fullscreen) { this.activateFullscreen(); }
    else { this.deactivateFullscreen(); }
  }

  private activateFullscreen(): void {
    if (this.docElem.requestFullscreen) {
      this.docElem.requestFullscreen();
    } else if (this.docElem.mozRequestFullScreen) {
      /* Firefox */
      this.docElem.mozRequestFullScreen();
    } else if (this.docElem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.docElem.webkitRequestFullscreen();
    } else if (this.docElem.msRequestFullscreen) {
      /* IE/Edge */
      this.docElem.msRequestFullscreen();
    }
  }

  private deactivateFullscreen(): void {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  private checkScreenModeEvent(event): void {
    this.selfService.toggle(Menu.telaCheia);
    this.checkScreenMode();
  }

  /*** VISÃO 3D ***/

  public toggle3D(): void {
    this.selfService.toggle(Menu.visao3D);
    this.cesiumService.toggleSceneMode2D3D();
  }

  /*** VISÃO NADIR ***/

  public toggleVisaoNadir(): void {
    this.selfService.toggle(Menu.visaoNadir);
    this.cesiumService.showNadir(() => this.selfService.toggle(Menu.visaoNadir));
  }

  /*** DEPURAÇÃO DO TERRENO ***/

  public toggleDepuracaoTerreno(): void {
    this.selfService.toggle(Menu.depuracaoTerreno);
    this.cesiumService.setDebugWireFrame( this.selfService.isActive(Menu.depuracaoTerreno) );
  }

  /*** ZOOM DIVERSOS ***/

  public goToMinhaLocalizacao(): void {
    if (this.selfService.isActive(Menu.minhaLocalizacao)) {
      this.selfService.toggle(Menu.minhaLocalizacao)
      this.cesiumService.removerMyLocationMarker()
      return
    }
    this.cesiumService.goToMyLocation(() => this.selfService.toggle(Menu.minhaLocalizacao));
  }

  public zoomIn(): void { this.interval = setInterval(() => this.cesiumService.zoomIn(), 100); }
  public zoomOut(): void { this.interval = setInterval(() => this.cesiumService.zoomOut(), 100); }
  public stopZooming() { clearInterval(this.interval); }

  public zoomToBox(): void {
    this.selfService.toggle(Menu.zoomArea);
    const handler = (drawing: any) => {
      this.cesiumService.flyTo({
        destination: drawing.extent,
        complete: () => this.selfService.toggle(Menu.zoomArea),
        cancel: () => this.selfService.toggle(Menu.zoomArea)
      });
    };
    this.drawHelperService.drawBox(false, false, handler);
  }

  public zoomToBrasil(): void {
    this.selfService.toggle(Menu.zoomBrasil);
    this.cesiumService.flyTo({
      destination: this.cesiumService.baseLocation,
      complete: () => this.selfService.toggle(Menu.zoomBrasil),
      cancel: () => this.selfService.toggle(Menu.zoomBrasil)
    });
  }

  public zoomAnterior(): void { // COMPORTAMENTO ESTRANHO
    this.selfService.toggle(Menu.zoomAnterior);
    setTimeout(() => { this.selfService.toggle(Menu.zoomAnterior); }, 100);
    this.cesiumService.returnToLastZoom();
  }

  /*** *** *** *** SUBMENU *** *** *** ***/

  /*** GRID ***/

  public toggleGrid(): void {
    this.selfService.toggle(Submenu.grid);
    this.mapValuesStore.toggleActivateGrid();
  }

  /*** ESCALA ***/

  public toggleEscala(): void {
    this.selfService.toggle(Submenu.escala);
    this.mapValuesStore.toggleActiveEscala();
  }

  /*** INDICADOR NORTE ***/

  public toggleIndicadorNorte(): void {
    this.selfService.toggle(Submenu.indicadorNorte);
    this.mapValuesStore.toggleActiveRosaVentos();
  }

  /*** MAPA DE SITUAÇÃO ***/

  public toggleMapaSituacao(): void {
    this.selfService.toggle(Submenu.mapaSituacao);
    this.mapValuesStore.toggleActivePipMap();
  }

  /*** LEGENDAS ***/

  public toggleLegenda(): void {
    // this.selfService.toggle(Submenu.legenda); // está no this.mapValuesStore.toggleActiveLegenda();
    this.mapValuesStore.toggleActiveLegenda();
  }

  /*** MAPA BASE ***/

  public changeMapaBase(): void {
    // this.selfService.toggle(Submenu.mapaBase); // está no this.activeToolsStore.toggle(type);
    this.activeToolsStore.toggle(ActiveToolType.SELECAO_MAPA_BASE);
  }

  /*** RESOLUÇÃO DO MAPA BASE ***/

  public changeResolucao(): void {
    // this.selfService.toggle(Submenu.resolucao); // está no this.activeToolsStore.toggle(type);
    this.activeToolsStore.toggle(ActiveToolType.SELECAO_RESOLUCAO_BASE);
  }

  public toggleEstruturaLogistica() {
    this.selfService.toggle(Menu.estruturaLogistica);
    const isActive: boolean = this.selfService.isActive(Menu.estruturaLogistica);
    if (isActive) {
      this.estruturaLogisticaService.drawPolygonWithMouseClick();
    } else {
      this.estruturaLogisticaService.close();
    }
  }

}
