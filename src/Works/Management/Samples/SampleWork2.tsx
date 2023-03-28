import * as THREE from 'three';
import { Option } from '../../../Engine/WorkPlayer';
import GenerativeWork from "../GenerativeWork";

/**
 * サンプル
 *  作品内で動的に3Dオブジェクトを生成する
 */
export class SampleWork2 extends GenerativeWork{

  static workID : string = 'sample2';
  cameraType    : Option['camera'] = 'Orthographic';

  meshes: Array<THREE.Mesh>;

  constructor(){

    super();

    // 新しい3Dモデルを生成
    const generated = this.generateMesh();
    this.meshes = [ generated ];
    
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

  generateMesh(): THREE.Mesh{
    const geometry = new THREE.BoxGeometry(400, 400, 400);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    return mesh
  }

}