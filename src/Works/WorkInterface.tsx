import * as THREE from 'three';

export interface WorkInterface{

  meshes: Array<THREE.Mesh>;    // レンダー対象の3Dオブジェクト

  /**
   * 作品本体の処理
   * @param scene レンダリング対象のシーン 作品内で動的に3Dオブジェクトを生成する場合は必須のオプション
   */
  main(scene?: THREE.Scene): void;

  // シーンに指定された3Dオブジェクトを追加する
  // 基本的には利用不要 meshes にセットされたものはWorkPlayerがライフサイクルを管理する
  // 本メソッドは作品内部で動的に3Dオブジェクトを生成する際などに使用すること
  updateScene(scene: THREE.Scene, targetMeshes: Array<THREE.Mesh>): void;

}

export default WorkInterface