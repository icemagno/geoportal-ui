import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

declare const Cesium: any;
declare const $: any;

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FooterComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent implements OnInit {
  private viewer: any;
  
  private readonly west   = -80.72;
  private readonly south  = -37.16;
  private readonly east   = -31.14;
  private readonly north  = 11.79;

  constructor() {}

  ngOnInit() {
    //
  }

  ngAfterViewInit() {
    if (typeof Cesium !== 'undefined') {
      console.log('Cesium is loaded:', Cesium);

      $( document ).ready(() => {
        this.initMap();
      });

    }
  }

  public goHome(): void {
    const BASE_LOCATION = Cesium.Rectangle.fromDegrees(
      this.west,
      this.south,
      this.east,
      this.north
    );
    const center = Cesium.Rectangle.center( BASE_LOCATION );
    const initialPosition = Cesium.Cartesian3.fromRadians(
      center.longitude,
      center.latitude,
      9500000
    );
    const initialOrientation = Cesium.HeadingPitchRoll.fromDegrees(0, -90, 0);
    this.viewer.scene.camera.setView({
      destination: initialPosition,
      orientation: initialOrientation,
      endTransform: Cesium.Matrix4.IDENTITY,
    });
  }

  private initMap(): void {
    
    const google = new Cesium.UrlTemplateImageryProvider({
      url : 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    });	

    const openstreetmap = new Cesium.OpenStreetMapImageryProvider({
      url: 'https://a.tile.openstreetmap.org/',
    });

    this.viewer = new Cesium.Viewer('cesiumContainer',{
      sceneMode : Cesium.SceneMode.SCENE2D,
      timeline: false,
      animation: false,
      baseLayerPicker: false,
      skyAtmosphere: false,
      fullscreenButton : false,
      geocoder : false,
      homeButton : false,
      infoBox : false,
      skyBox : false,
      sceneModePicker : false,
      selectionIndicator : false,
      navigationHelpButton : false,
        imageryProvider: openstreetmap,
        requestRenderMode : false,
        contextOptions: { 
          requestWebgl2: true,
          webgl: {
          alpha: true,
          }
        }
    });

    this.goHome();

    this.viewer.cesiumWidget.creditContainer.parentNode.removeChild(
      this.viewer.cesiumWidget.creditContainer
    );
    $(".cesium-viewer-animationContainer").hide();
    $(".cesium-viewer-timelineContainer").hide();

    $(".main-header").show();
    $("#content-wrapper").show();

  }

}
