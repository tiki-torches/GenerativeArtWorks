import * as THREE from 'three';
import { Option } from '../../../Engine/WorkPlayer';
import GenerativeWork, { OptionMethodMain } from "../GenerativeWork";

/**
 * サンプル
 *  作品内で動的に3Dオブジェクトを生成する
 */
export class SampleWork2 extends GenerativeWork{

  static workID : string = 'sample2';
  cameraType    : Option['camera'] = 'Orthographic';

  tdobjs: Array<THREE.Mesh>;

  constructor(){

    super();

    // 新しい3Dモデルを生成
    const generated = this.generateMesh();
    this.tdobjs = [ generated ];
    
  }

  main(option: OptionMethodMain){

    // アニメーション
    this.tdobjs.forEach( (mesh) => {
      mesh.rotation.y += 0.01;
      mesh.position.x += 1;
    })

    // 新しい3Dモデルを生成
    const generated = this.generateMesh();
    this.tdobjs.push(generated);
    if(option.scene){
      this.updateScene(option.scene, [ generated ]);
    }
  };

  generateMesh(): THREE.Mesh{
    const geometry = new THREE.BoxGeometry(400, 400, 400);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    return mesh
  }

}