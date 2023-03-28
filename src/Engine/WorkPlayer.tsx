import WorkInterface from 'src/Works/Management/GenerativeWork';
import * as THREE from 'three';

/**
 * 基本的なTDModel
 * 各種レンダリングライブラリ向けに変換する素として使用する
 */
class WorkPlayer{

  // 作品を描画するエリアとなるHTMLcanvas要素
  canvas    : HTMLCanvasElement;

  // 作品の再生状況の管理用プロパティ
  reqAnmID      : number;     // アニメーションの実行回数（実行フレーム数）を保持するプロパティ
  isPlaying     : Boolean;

  // THREE用
  width   = 1920;
  height  = 1080;
  renderer  : THREE.WebGLRenderer;
  scene     : THREE.Scene;
  camera    : THREE.PerspectiveCamera | THREE.OrthographicCamera;

  constructor(canvas: HTMLCanvasElement){

    this.canvas       = canvas;
    this.reqAnmID     = 0;
    this.isPlaying    = false;

    const renderer: any = new THREE.WebGLRenderer({
      canvas: canvas, antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(this.width, this.height);
    this.renderer = renderer;

    // const camera = new THREE.PerspectiveCamera(45, this.width / this.height);
    // new THREE.OrthographicCamera(left, right, top, bottom, near, far)
    const camera = new THREE.OrthographicCamera(-960, +960, 540, -540, 1, 1000);
    camera.position.set(0, 0, +1000);
    this.camera = camera;

    const scene = new THREE.Scene();
    this.scene = scene;

  }

  play(work: WorkInterface): void{

    // 多重再生の防止のため、再生中であるか確認する
    // 再生中である場合は何もしない
    if(this.isPlaying === true){

      // do nothing

    // 再生中でない場合は再生処理を実行する
    }else{

      // Sceneを初期化
      this.initializeScene(this.scene, work.meshes);
  
      const animate = () => {

        // 作品を再生
        work.main(this.scene);
  
        // レンダリングを実行
        this.renderer.render(this.scene, this.camera);
  
        // 本処理をフレーム更新時に発火するよう登録
        const reqAnmID = requestAnimationFrame(animate);
  
        // SideEffect
        this.reqAnmID     = reqAnmID;   // 本処理のアニメーションIDを一時保持
        this.isPlaying    = true;
  
      }
      animate();
  
    }

  }

  /**
   * 作品の再生を停止（中断）するメソッド
   */
  stop(): void{
    cancelAnimationFrame(this.reqAnmID);
    this.isPlaying = false;
  }

  reset(work: WorkInterface): void{
    this.initializeScene(this.scene, work.meshes);
    this.reqAnmID = 0;
    this.isPlaying = false;
  }

  /**
   * Sceneを初期化する（指定された3Dオブジェクトのみ登録された状態に変更する）メソッド
   * @param scene 
   * @param tdModels 
   */
  initializeScene(scene: THREE.Scene, meshList: Array<THREE.Mesh>): void{

    // Sceneに登録済みの3Dオブジェクトを全て削除
    scene.children.forEach( (tdObject) => { scene.remove(tdObject) });

    // Sceneに3Dオブジェクトを登録
    meshList.forEach( (mesh) => { scene.add(mesh) });
  }


}


export default WorkPlayer