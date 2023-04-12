import * as THREE from 'three';
import { Option } from '../../../Engine/WorkPlayer';
import GenerativeWork, { OptionMethodMain } from "../GenerativeWork";


export class SampleWorkLine extends GenerativeWork{

  static workID     : string = 'SampleWorkLine';

  cameraType : Option['camera'] = 'Perspective';
  tdobjs: Array<THREE.Line>;

  constructor(){

    super();

    // 新しい3Dモデルを生成
    const time      = Date.now() / 1000;
    const points    = this.generatePoints(time);
    const generated = this.generateLine(points);
    this.tdobjs = [ generated ];
    
  }

  main(option: OptionMethodMain){

    // アニメーション
    this.tdobjs.forEach( (line) => {

      const time      = option.animID? option.animID/100: Date.now()/1000;
      const newPoints = this.generatePoints(time);
      line.geometry.setFromPoints(newPoints)

      // 描画を更新
      line.geometry.attributes.position.needsUpdate = true;
    })

  };

  generatePoints(time: number): Array<THREE.Vector3>{

    const AMPLITUDE   = 100;
    const PERIOD      = 180;
    const LENGTH      = 720;
    const START_POINT = { x: -500, y: 0, z: 0 };

    const points = [];
    for(let i = 0; i < LENGTH ; i++){
      const radian = (i / PERIOD) * Math.PI + time;
      points.push(
        new THREE.Vector3(
          START_POINT.x + i,
          START_POINT.y + Math.sin(radian) * AMPLITUDE,
          START_POINT.z
        )
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