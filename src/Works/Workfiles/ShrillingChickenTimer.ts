import * as THREE from 'three';
{/** @ts-ignore */}
import noise from 'simplenoise';
import { Option } from '../../Engine/WorkPlayer';
import GenerativeWork from "../Management/GenerativeWork";


export class ShrillingChickenTimer extends GenerativeWork{

  static workID     : string = 'ShrillingChickenTimer';
  static cameraType : Option['camera'] = 'Perspective';

  tdobjs: Array<THREE.Line>;

  constructor(){

    super();

    // 3Dモデルを生成
    this.tdobjs = [];

    const dial = this.makeDial();
    this.tdobjs.push(dial);

    const indexes= this.makeIndexes();
    indexes.forEach( (index) => this.tdobjs.push(index) );

    
  }

  main(){

    // アニメーション
    this.tdobjs.forEach( (line) => {

      /**
      const time      = Date.now() / 1000;
      const newPoints = this.generatePoints(time);
      line.geometry.setFromPoints(newPoints)

      // 描画を更新
      line.geometry.attributes.position.needsUpdate = true;
       */
    })

  };

  generatePoints(time: number): Array<THREE.Vector3>{

    const points = [new THREE.Vector3(0, 0, 0)];
    
    return points
  }


  generateLine(points: Array<THREE.Vector3>): THREE.Line{

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });;
    const line = new THREE.Line(geometry, material);
    return line
    
  }

  // 文字盤
  makeDial(): THREE.Line{

    const START_POINT = { x: 0, y: 0, z: 0 };
    const RADIUS      = 400;

    const points = [];
    for(let i = 0; i <= 360 ; i++){
      
      const radians = i * (Math.PI / 180)

      const x = START_POINT.x + Math.cos(radians) * RADIUS;
      const y = START_POINT.y + Math.sin(radians) * RADIUS;
      const z = START_POINT.z;

      points.push(
        new THREE.Vector3(x, y, z)
      );
    }

    const dial = this.generateLine(points);

    return dial
  }

  // 文字盤上の文字
  makeIndexes(): Array<THREE.Line>{

    const index1 = this.generateLine([ new THREE.Vector3(0, 400, 0), new THREE.Vector3(0, 0, 0) ]);
    const index2 = this.generateLine([ new THREE.Vector3(400, 0, 0), new THREE.Vector3(0, 0, 0) ]);
    const index3 = this.generateLine([ new THREE.Vector3(0, -400, 0), new THREE.Vector3(0, 0, 0) ]);
    const index4 = this.generateLine([ new THREE.Vector3(-400, 0, 0), new THREE.Vector3(0, 0, 0) ]);

    const indexes = [ index1, index2, index3, index4 ];

    return indexes
  }

  makeChickenBox(){

  }

}