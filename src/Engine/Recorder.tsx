import React, { useEffect, useState, useRef } from "react";
import { Grid, Tooltip } from "@mui/material";
import { RadioButtonUnchecked, RadioButtonChecked } from '@mui/icons-material';


type Props = {
  canvas?: HTMLCanvasElement | null;
}

export const Recorder: React.FC<Props> = ({ canvas }) => {
/**
 * Summary: 渡されたCanvasに描画された映像を録画ファイルとして出力するボタン
 */

  // ___ state ___ ___ ___ ___ ___
  const [ recorder, setRecorder ] = useState<MediaRecorder>();
  const [ isRecordingFlg, setIsrecordingFlg ] = useState<boolean>(false);

  // ___ use ref ___ ___ ___ ___ ___
  const anchorRef: any | null = useRef(null);

  // ___ use effect ___ ___ ___ ___ ___

  // ___ event handler ___ ___ ___ ___ ___

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
  }

  const startRecording = () => {

    //canvasからストリームを取得
    if(canvas){

      const stream = canvas.captureStream();    // https://developer.mozilla.org/ja/docs/Web/API/HTMLCanvasElement/captureStream
      /** 解像度向上のテスト
      const videoTrack = stream.getVideoTracks()[0];
      const constraints = {
        width: { min: 640, ideal: 1920 },
        height: { min: 480, ideal: 1080 },
      };
      videoTrack.applyConstraints(constraints);
       */
      const recorder = new MediaRecorder(stream, { mimeType:'video/webm;codecs=vp9' });

      // 録画終了時に発火するイベントを登録
      recorder.ondataavailable = (e) => {

        const isConfirmed = window.confirm('Download Movie?');

        if(isConfirmed){
          var videoBlob = new Blob([e.data], { type: e.data.type });
          const blobUrl = window.URL.createObjectURL(videoBlob);
          anchorRef.current.download = 'GenerativeArtWork.webm';    // 出力ファイル名
          anchorRef.current.href = blobUrl;                         // anchorDOMにファイルをセット
          anchorRef.current.click();                                // リンク押下を実行
        }
      }

      recorder.start();
      setRecorder(recorder);
      setIsrecordingFlg(true);
    }
  }

  const stopRecording = () => {
    if(recorder){
      if(recorder.state == "recording"){
        recorder.stop();
      } else {
        alert('Recording has not been triggered')
      }
    }
    setIsrecordingFlg(false);
  }

  return (
    <div>
      { isRecordingFlg?
        <Tooltip title = "Stop Recording">
          <RadioButtonChecked onClick = { stopRecording } fontSize = "large" style = {{ cursor:'pointer' }} />
        </ Tooltip>:
        <Tooltip title = "Start Recording">
          <RadioButtonUnchecked onClick = { startRecording } fontSize = "large" style = {{ cursor:'pointer' }} />
        </Tooltip>
      }
      <a ref = { anchorRef } id="anchor" hidden> download </a>
    </div>
  );

};


export default Recorder
