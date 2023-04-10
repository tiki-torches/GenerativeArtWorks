import * as THREE from 'three';
import { Option } from '../../../Engine/WorkPlayer';
import GenerativeWork from "../GenerativeWork";

/**
 * サンプル
 */
export class SampleWork1 extends GenerativeWork{

  static workID : string = 'sample1';
  cameraType    : Option['camera'] = 'Perspective';

  tdobjs: Array<THREE.Mesh>;

  constructor(){

    super();

    const geometry = new THREE.BoxGeometry(400, 400, 400);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    this.tdobjs = [ mesh ];
    
  }

  main(){
    this.tdobjs.forEach( (mesh) => {  mesh.rotation.y += 0.01; })
  };

}