import * as THREE from 'three';
import { Option } from '../../../Engine/WorkPlayer';
import GenerativeWork from "../GenerativeWork";

/**
 * サンプル
 *  作品内で動的に3Dオブジェクトを生成する
 */
export class SampleWorkLine extends GenerativeWork{

  static workID     : string = 'SampleWorkLine';
  static cameraType : Option['camera'] = 'Perspective';

  meshes: Array<THREE.Line>;

  constructor(){

    super();

    // 新しい3Dモデルを生成
    const generated = this.generateMesh();
    this.meshes = [ generated ];
    
  }

  main(scene?: THREE.Scene){

    // アニメーション
    this.meshes.forEach( (mesh) => {
      mesh.rotation.y += 0.01;
    })

  };

  generateMesh(): THREE.Line{
    const points = [];
    points.push(new THREE.Vector3(-100, 0, 0));
    points.push(new THREE.Vector3(0, 100, 0));
    points.push(new THREE.Vector3(100, 0, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({color: 0xffffff});;
    const mesh = new THREE.Line(geometry, material);
    return mesh
  }

}