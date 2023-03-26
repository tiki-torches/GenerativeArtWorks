import * as THREE from 'three';
import GenerativeWork from "../Management/GenerativeWork";

/**
 * サンプル
 */
export class SampleWork1 extends GenerativeWork{

  static workID : string = 'sample1';

  meshes: Array<THREE.Mesh>;

  constructor(){

    super();

    const geometry = new THREE.BoxGeometry(400, 400, 400);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    this.meshes = [ mesh ];
    
  }

  main(){
    this.meshes.forEach( (mesh) => {  mesh.rotation.y += 0.01; })
  };

}