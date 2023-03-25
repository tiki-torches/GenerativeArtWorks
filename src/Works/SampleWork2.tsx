import * as THREE from 'three';
import WorkInterface from "./WorkInterface";

/**
 * サンプル
 *  作品内で動的に3Dオブジェクトを生成する
 */
export class SampleWork2 implements WorkInterface{

  meshes  : Array<THREE.Mesh>;

  constructor(){

    const geometry = new THREE.BoxGeometry(400, 400, 400);
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry, material);
    this.meshes = [ box ];
    
  }

  main(scene: THREE.Scene){

    // アニメーション
    this.meshes.forEach( (mesh) => {
      mesh.rotation.y += 0.01;
      mesh.position.x += 1;
    })

    // 新しい3Dモデルを生成
    const generated = this.generateMesh();
    this.meshes.push(generated);
    this.updateScene(scene, [ generated ]);
  };

  updateScene(scene: THREE.Scene, targetMeshes: Array<THREE.Mesh>): void{
    targetMeshes.forEach( (mesh) => { scene.add(mesh); });
  }

  generateMesh(): THREE.Mesh{
    const geometry = new THREE.BoxGeometry(400, 400, 400);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    return mesh
  }


}