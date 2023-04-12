import * as THREE from 'three';
{/** @ts-ignore */}
import noise from 'simplenoise';
import { Option } from '../../Engine/WorkPlayer';
import GenerativeWork, { OptionMethodMain } from "../Management/GenerativeWork";
{/** @ts-ignore */}
import chicken1 from './Medium/chicken1.mp3'
{/** @ts-ignore */}
import chicken2 from './Medium/chicken2.mp3'
{/** @ts-ignore */}
import chicken3 from './Medium/chicken3.mp3'
{/** @ts-ignore */}
import chicken4 from './Medium/chicken4.mp3'


export class ShrillingChickenUniverse extends GenerativeWork{

  static workID     : string = 'ShrillingChickenUniverse';
  cameraType    : Option['camera'] = 'Orthographic';

  tdobjs: Array<THREE.Line | THREE.Mesh>;
  chickens: Array<ChickenHand>;

  constructor(){

    super();

    // 3Dモデルを生成
    this.tdobjs = [];
    this.chickens = [];

    const dial = this.makeDial();
    this.tdobjs.push(dial);

    const indexes= this.makeIndexes();
    indexes.forEach( (index) => this.tdobjs.push(index) );

    const mesh1 = this.createMesh();
    const cryCoord = [ { x: 1, y: 0, z: 0 }, { x: -1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }, { x: 0, y: -1, z: 0 }]
    const c1 = new ChickenHand(mesh1, cryCoord, chicken1, 1, 400);
    this.tdobjs.push(mesh1);
    this.chickens.push(c1);
    
    const mesh2 = this.createMesh();
    const c2 = new ChickenHand(mesh2, cryCoord, chicken2, 1/2, 300);
    this.tdobjs.push(mesh2);
    this.chickens.push(c2);

    const mesh3 = this.createMesh();
    const c3 = new ChickenHand(mesh3, cryCoord, chicken3, 1/4, 200);
    this.tdobjs.push(mesh3);
    this.chickens.push(c3);

    const mesh4 = this.createMesh();
    const c4 = new ChickenHand(mesh4, cryCoord, chicken4, 1/16, 100);
    this.tdobjs.push(mesh4);
    this.chickens.push(c4);

  }

  main(option: OptionMethodMain){

    // アニメーション
    this.tdobjs.forEach( (line) => {

      /**
      const time      = Date.now() / 1000;
      const newPoints = this.generatePoints(time);
      line.geometry.setFromPoints(newPoints)

      // 描画を更新
      line.geometry.attributes.position.needsUpdate = true;
       */
    })

    // 音声
    this.chickens.forEach( (c) => {
      c.cry();
      c.move(option.animID!);
    })

  };

  generatePoints(time: number): Array<THREE.Vector3>{

    const points = [new THREE.Vector3(0, 0, 0)];
    
    return points
  }


  generateLine(points: Array<THREE.Vector3>): THREE.Line{

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });;
    const line = new THREE.Line(geometry, material);
    return line
    
  }

  // 文字盤
  makeDial(): THREE.Line{

    const RADIUS      = 400;

    const points = [];
    for(let i = 0; i <= 360 ; i++){
      
      const radians = i * (Math.PI / 180)

      const x = Math.cos(radians) * RADIUS;
      const y = Math.sin(radians) * RADIUS;
      const z = 0;

      points.push(
        new THREE.Vector3(x, y, z)
      );
    }

    const dial = this.generateLine(points);

    return dial
  }

  // 文字盤上の文字
  makeIndexes(): Array<THREE.Line>{

    const index1 = this.generateLine([ new THREE.Vector3(0, 400, 0), new THREE.Vector3(0, 0, 0) ]);
    const index2 = this.generateLine([ new THREE.Vector3(400, 0, 0), new THREE.Vector3(0, 0, 0) ]);
    const index3 = this.generateLine([ new THREE.Vector3(0, -400, 0), new THREE.Vector3(0, 0, 0) ]);
    const index4 = this.generateLine([ new THREE.Vector3(-400, 0, 0), new THREE.Vector3(0, 0, 0) ]);

    const indexes = [ index1, index2, index3, index4 ];

    return indexes
  }

  createMesh(){
    const geometry  = new THREE.BoxGeometry(50, 50, 50);
    const material  = new THREE.MeshNormalMaterial();
    const mesh      = new THREE.Mesh(geometry, material);
    return mesh
  }

}

type Coordinate = { x: number, y: number, z:number }

class ChickenHand{

  tdobj: THREE.Mesh
  cryCoordinates: Array<Coordinate>;    // 通過時に鳴き声をならす座標
  cryVoice: any;                        // 鳴き声ファイルのパス
  cryWeight: number;                    // 鳴く頻度を調整する重み
  radius: number;                       // 軌道

  constructor(tdobj: THREE.Mesh, cryCoordinates: Array<Coordinate>, cryVoice: any, cryWeight: number, radius: number){
    this.tdobj = tdobj;
    this.cryCoordinates = cryCoordinates;
    this.cryVoice = cryVoice;
    this.cryWeight = cryWeight;
    this.radius = radius;
  }

  cry(){
    this.cryCoordinates.forEach((coord) => {
      if( ( Math.abs(this.tdobj.position.x - coord.x * this.radius) < 1) &&  (Math.abs(this.tdobj.position.y - coord.y * this.radius) < 1) ){
        const sound = new Audio(this.cryVoice);
        sound.play();
        this.tdobj.scale.x = this.tdobj.scale.x * 1.1;
        this.tdobj.scale.y = this.tdobj.scale.y * 1.1;
      }else{
      }
    })
  }

  move(animID: number){
    const radians = animID * (Math.PI / 180) * this.cryWeight;
    const x = - (Math.cos(radians + 10) * this.radius);
    const y = Math.sin(radians + 10) * this.radius;
    const z = 0;
    this.tdobj.position.set(x, y, z);
  }

}