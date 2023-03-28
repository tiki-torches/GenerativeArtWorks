import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import WorkPlayer from "../../Engine/WorkPlayer";
import WorkInterface from "../../Works/Management/GenerativeWork";

/**
 * Outline	: XXXするComponent
 * Logic		: - AAAをBBBにする
 *            - 親ComponentからCCCを受け取り、DDDとしたものを子Componentに渡す
 * View			: - KKKをリスト表示する
 */

// Type Declaration of Props
type Props = {
  work: WorkInterface;
  isValidAutoPlay?: boolean;
}

export const PlaybackScreen : React.FC<Props> = ({ work, isValidAutoPlay }) => {

  // ___ state ___ ___ ___ ___ ___
  const [ workPlayer, setWorkPlayer ] = useState<WorkPlayer>();

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
    const workPlayer = new WorkPlayer(canvas);
    setWorkPlayer(workPlayer);
  }

  const play = () => {
    workPlayer?.play(work);
  };

  const stop = () => {
    workPlayer?.stop();
  }

  return (
    <Grid container>

      <Grid container item>
        <canvas id = 'canvas' onClick = { onClickScreen }/>
      </Grid>

      <Grid container>
        <Grid item> <button onClick = { play }> PLAY </button> </Grid>
        <Grid item> <button onClick = { stop }> STOP </button> </Grid>
      </Grid>

    </Grid>
  );
  
};



export default PlaybackScreen