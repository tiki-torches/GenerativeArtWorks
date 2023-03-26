import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Link, Routes, useSearchParams } from 'react-router-dom'
import { NotFound } from "../../Works/Management/NotFound";
import { NOT_FOUND } from "../../Global/Vars";
import { WORK_LIST } from "../../Global/WorkList";
import GenerativeWork from "../../Works/Management/GenerativeWork";
import { SampleWork1 } from "../../Works/SampleWork1";
import PlaybackScreen from "../Molecules/PlaybackScreen";


type Props = {
}

export const ViewerPage : React.FC <Props> = ({ }) => {

  // ___ state ___ ___ ___ ___ ___
  const [ workToView, setWorkToView ] = useState<GenerativeWork>(new SampleWork1());

    // ___ Hook ___ ___ ___ ___ ___
  const [ searchParams ] = useSearchParams();

  // ___ use effect ___ ___ ___ ___ ___

  // ___ event handler ___ ___ ___ ___ ___

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
  }

  const getWorkID = (): string => {
    let workID = searchParams.get('workID');
    workID = workID? workID: NOT_FOUND;
    return workID
  }

  const generateWork = (workID: string) => {
    let TargetClass = WORK_LIST.find( (work) => { return work.workID === workID });
    TargetClass = TargetClass? TargetClass: NotFound;
    const work = new TargetClass();
    return work
  }

  return (
    <div>
      <PlaybackScreen work = { generateWork(getWorkID()) }/>
    </div>
  );
};

export default ViewerPage