import React, { useEffect, useState, createRef } from "react";
import Grid from '@mui/material/Grid';
import WorkPlayer, { Option } from "../../Engine/WorkPlayer";
import GenerativeWork from "../../Works/Management/GenerativeWork";
import Recorder from "../../Engine/Recorder";

/**
 * Outline	: XXXするComponent
 * Logic		: - AAAをBBBにする
 *            - 親ComponentからCCCを受け取り、DDDとしたものを子Componentに渡す
 * View			: - KKKをリスト表示する
 */

// Type Declaration of Props
type Props = {
  work: GenerativeWork;
  isValidAutoPlay?: boolean;
}

export const PlaybackScreen : React.FC<Props> = ({ work, isValidAutoPlay }) => {

  // ___ state ___ ___ ___ ___ ___
  const [ workPlayer, setWorkPlayer ] = useState<WorkPlayer>();
  const [ canvasRef,  setCanvasRef ]  = useState<HTMLCanvasElement>();
  const [ cameraType, setCameraType ] = useState<Option['camera']>(work.cameraType);

  // ___ use effect ___ ___ ___ ___ ___
  useEffect( () => { construct() }, [ ] );    // 初回レンダー時のみ実行 useEffectの依存対象に空配列を指定することで初回のみに限定できる
  useEffect( () => { onReadyPlayer() }, [ workPlayer ] );    // プレイヤーの準備完了時に再生を自動で開始

  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  };

  const onClickScreen = () => {
    if(workPlayer?.isPlaying === true){
      workPlayer?.stop();
    }else{
      workPlayer?.play(work);
    }
  }

  const onReadyPlayer = () => {
    if(isValidAutoPlay){ play() }
  }

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
  }


  const construct = () => {
    const canvas: HTMLCanvasElement = document.querySelector("#canvas") as HTMLCanvasElement;
    setCanvasRef(canvas);
    const option: Option = { camera: cameraType }
    const workPlayer = new WorkPlayer(canvas, option);
    setWorkPlayer(workPlayer);
  }

  const play = () => {
    workPlayer?.play(work);
  };

  const stop = () => {
    workPlayer?.stop();
  }

  const switchCamera = () => {
    const request: Option['camera'] = (cameraType === 'Perspective')? 'Orthographic': 'Perspective';
    workPlayer?.changeCamera(request);
    setCameraType(request);
  }

  return (
    <Grid container>

      <Grid container item>
        <canvas id = 'canvas' onClick = { onClickScreen }/>
      </Grid>

      <Grid container>
        <Grid item> <button onClick = { play }> PLAY </button> </Grid>
        <Grid item> <button onClick = { stop }> STOP </button> </Grid>
        <Recorder canvas = { canvasRef }/>
      </Grid>

      <Grid container>
        <Grid item> <button onClick = { switchCamera }> SWITCH CAMERA TYPE </button> </Grid>
        <Grid item> { cameraType } </Grid>
      </Grid>

    </Grid>
  );
  
};



export default PlaybackScreen