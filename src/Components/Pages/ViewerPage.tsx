import React, { useEffect, useState } from "react";
import PlaybackScreen from "../Molecules/PlaybackScreen";

type Props = {
  sampleProp ?: any;
}

export const ViewerPage : React.FC <Props> = ({ sampleProp }) => {

  // ___ state ___ ___ ___ ___ ___
  const [ sampleState, setSampleState ] = useState<string>('This is SampleState');

  // ___ use effect ___ ___ ___ ___ ___
  useEffect( () => { console.log(sampleState) }, [ sampleState ] );

  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  };

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
  }

  return (
    <div>
      <h2>{ ViewerPage.name }</h2>
      <PlaybackScreen/>
    </div>
  );
};

export default ViewerPage