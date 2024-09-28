import { Component, OnInit } from '@angular/core';

declare const Cesium: any;

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [

  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent implements OnInit {

  ngOnInit() {
    if (typeof Cesium !== 'undefined') {
      console.log('Cesium is loaded:', Cesium);

      let map02 = new Cesium.UrlTemplateImageryProvider({
		    url : 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
		  });	

      let viewer = new Cesium.Viewer('cesiumContainer',{
        sceneMode : Cesium.SceneMode.SCENE3D,
        timeline: false,
        animation: false,
        baseLayerPicker: false,
        skyAtmosphere: false,
        fullscreenButton : false,
        geocoder : false,
        homeButton : false,
        infoBox : false,
        skyBox : false,
        sceneModePicker : true,
        selectionIndicator : false,
        navigationHelpButton : false,
          imageryProvider: map02,
          requestRenderMode : false,
          contextOptions: { 
            requestWebgl2: true,
            webgl: {
            alpha: true,
            }
          }
      });

    } 
  }

}
