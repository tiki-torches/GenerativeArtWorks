import * as THREE from 'three';
import { Option } from '../../Engine/WorkPlayer';
import GenerativeWork from "../Management/GenerativeWork";

/**
 * サンプル
 */
export class JustLowerRightRotateFaster extends GenerativeWork{

  static workID : string = 'JustLowerRightRotateFaster';
  cameraType    : Option['camera'] = 'Orthographic';

  meshes: Array<THREE.Mesh>;
  meshMatrix: Array<Array<THREE.Mesh>>;

  constructor(){

    super();

    this.meshes     = [];
    this.meshMatrix = [];

    const NUMBER_OF_ROWS: number  = 30;
    const NUMBER_OF_LINES: number = 20;
    const SIZE_OF_BOX: number     = 50;
    const START_POSITION          = { x: -800, y: 450, z: 0 }

    const createMesh = () => {
      const geometry  = new THREE.BoxGeometry(SIZE_OF_BOX, SIZE_OF_BOX, SIZE_OF_BOX);
      const material  = new THREE.MeshNormalMaterial();
      const mesh      = new THREE.Mesh(geometry, material);
      return mesh
    }

    // create meshes
    for(let i = 0; i < NUMBER_OF_ROWS - 1; i++){
      this.meshMatrix[i] = [];
      for(let j = 0; j < NUMBER_OF_LINES -1; j++){
        const mesh = createMesh();
        this.meshes.push(mesh);
        this.meshMatrix[i][j] = mesh;
      }
    }

    // decide the position of each mesh
    for(let i = 0; i < NUMBER_OF_ROWS - 1; i++){

      let x = 0;        let y = 0;        let z = 0;

      for(let j = 0; j < NUMBER_OF_LINES - 1; j++){
        const targetMesh = this.meshMatrix[i][j];
        x = START_POSITION.x + SIZE_OF_BOX * i;
        y = START_POSITION.y - SIZE_OF_BOX * j;
        z = START_POSITION.z;
        targetMesh.position.set(x, y, z);
      }

    }
  }

  main(){
    this.meshMatrix.forEach( (row, i) => {
      row.forEach( (mesh, j) => {
        mesh.rotation.y +=  (i * 0.001) + (j * 0.001);
      })
    })
  };

}