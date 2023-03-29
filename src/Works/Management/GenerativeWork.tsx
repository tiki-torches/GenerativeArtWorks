import { Option } from '../../Engine/WorkPlayer';
import * as THREE from 'three';

export type OptionMethodMain = {
  scene?: THREE.Scene,
  animID?: number,
}
export abstract class GenerativeWork{

  static workID : string;

  // 作品で既定のカメラタイプ
  cameraType    : Option['camera'] = 'Perspective';

  // レンダー対象の3Dオブジェクト
  // 本リストに追加することでレンダー対象に設定される
  tdobjs: Array<THREE.Mesh | THREE.Line>;

  constructor(){
    this.tdobjs = [];
  }


  /**
   * 作品本体の処理
   * @param scene レンダリング対象のシーン 作品内で動的に3Dオブジェクトを生成する場合は必須のオプション
   */
  main(option: OptionMethodMain): void{ };

  // シーンに指定された3Dオブジェクトを追加する
  // 基本的には利用不要 meshes にセットされたものはWorkPlayerがライフサイクルを管理する
  // 本メソッドは作品内部で動的に3Dオブジェクトを生成する際などに使用すること
  updateScene(scene: THREE.Scene, targetMeshes: Array<THREE.Mesh>): void{
    targetMeshes.forEach( (mesh) => scene.add(mesh) );
  };

}

export default GenerativeWork