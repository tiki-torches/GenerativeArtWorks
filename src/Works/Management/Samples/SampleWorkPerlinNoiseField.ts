import * as THREE from 'three';
import { Vector3 } from 'three';
{/** @ts-ignore */}
import noise from 'simplenoise';
import { Option } from '../../../Engine/WorkPlayer';
import GenerativeWork, { OptionMethodMain } from "../GenerativeWork";


export class SampleWorkPerlinNoiseField extends GenerativeWork{

  static workID     : string = 'SampleWorkPerlinNoiseField';
  static cameraType : Option['camera'] = 'Perspective';

  tdobjs: Array<THREE.Line>;

  constructor(){

    super();

    this.tdobjs = []

    // 新しい3Dモデルを生成
    const NUM_LINES = 100;
    for(let i = 0; i < NUM_LINES; i++){
      const points    = this.generatePoints(0, i);
      const generated = this.generateLine(points);
      this.tdobjs.push(generated);
    }
    
  }

  main(option: OptionMethodMain){

    // カメラの位置を変更
    option.camera?.position.set(500, 1000, 1000);
    option.camera?.lookAt(new Vector3(0,0,0));

    // アニメーション
    this.tdobjs.forEach( (line, i) => {

      const time      = option.animID? option.animID/100: Date.now()/1000;
      const newPoints = this.generatePoints(time, i);
      line.geometry.setFromPoints(newPoints)

      // 描画を更新
      line.geometry.attributes.position.needsUpdate = true;
    })

  };

  generatePoints(time: number, startPointZ: number): Array<THREE.Vector3>{

    const WEIGHTX     = 50;
    const WEIGHTZ     = 10;
    const AMPLITUDE   = 100;
    const LENGTH      = 25;
    const NOISE_SPEED = 1 / 10;
    const START_POINT = { x: -500, y: 0, z: -500 };

    const points = [];
    for(let i = 0; i < LENGTH; i++){

      const px      = i     * NOISE_SPEED;
      const py      = time  * NOISE_SPEED;
      const pz      = startPointZ * NOISE_SPEED;
      const perlin  = noise.perlin3(px, py, pz);
      
      const x = START_POINT.x + i * WEIGHTX;
      const y = START_POINT.y + perlin * AMPLITUDE;
      const z = START_POINT.z + startPointZ * WEIGHTZ;

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