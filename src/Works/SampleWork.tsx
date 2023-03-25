import * as THREE from 'three';
import WorkInterface from "./WorkInterface";

/**
 * サンプル
 */
export class SampleWork implements WorkInterface{

  meshes  : Array<THREE.Mesh>;

  constructor(){

    const geometry = new THREE.BoxGeometry(400, 400, 400);
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry, material);
    this.meshes = [ box ];
    
  }

  main(){
    this.meshes.forEach( (mesh) => {  mesh.rotation.y += 0.01; })
  };

  updateScene(scene: THREE.Scene, targetMeshes: Array<THREE.Mesh>): void{
    
  }


}