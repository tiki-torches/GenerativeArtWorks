import * as THREE from 'three';
import GenerativeWork from "./GenerativeWork";
import { NOT_FOUND } from '../../Global/Vars';

/**
 * サンプル
 */
export class NotFound extends GenerativeWork{

  static workID : string = NOT_FOUND;

  tdobjs: Array<THREE.Mesh>;

  constructor(){

    super();

    const geometry = new THREE.BoxGeometry(40, 40, 40);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    this.tdobjs = [ mesh ];
    
  }

  main(){
    this.tdobjs.forEach( (mesh) => {  mesh.rotation.y += 0.01; })
  };

}