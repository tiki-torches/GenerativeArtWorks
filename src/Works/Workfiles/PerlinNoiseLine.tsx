import * as THREE from 'three';
{/** @ts-ignore */}
import noise from 'simplenoise';
import { Option } from '../../Engine/WorkPlayer';
import GenerativeWork from "../Management/GenerativeWork";


export class PerlinNoiseLine extends GenerativeWork{

  static workID     : string = 'PerlinNoiseLine';
  static cameraType : Option['camera'] = 'Perspective';

  tdobjs: Array<THREE.Line>;

  constructor(){

    super();

    // 新しい3Dモデルを生成
    const time      = Date.now() / 1000;
    const points    = this.generatePoints(time);
    const generated = this.generateLine(points);
    this.tdobjs = [ generated ];
    
  }

  main(){

    // アニメーション
    this.tdobjs.forEach( (line) => {

      const time      = Date.now() / 1000;
      const newPoints = this.generatePoints(time);
      line.geometry.setFromPoints(newPoints)

      // 描画を更新
      line.geometry.attributes.position.needsUpdate = true;
    })

  };

  generatePoints(time: number): Array<THREE.Vector3>{

    const AMPLITUDE   = 300;
    const LENGTH      = 1000;
    const NOISE_SPEED = 50;
    const START_POINT = { x: -500, y: 0, z: 0 };

    const points = [];
    for(let i = 0; i < LENGTH ; i++){

      const px      = i     / NOISE_SPEED;
      const py      = time  / NOISE_SPEED;
      const perlin  = noise.perlin2(px, py);
      
      const x = START_POINT.x + i ;
      const y = START_POINT.y + perlin * AMPLITUDE;
      const z = START_POINT.z;

      points.push(
        new THREE.Vector3(x, y, z)
      );
    }
    
    return points
  }


  generateLine(points: Array<THREE.Vector3>): THREE.Line{

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });;
    const line = new THREE.Line(geometry, material);
    return line
    
  }

}