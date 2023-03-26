import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import { Route, Link, Routes } from 'react-router-dom'
import { ViewerPage } from './ViewerPage'
import GenerativeWork from '../../Works/Management/GenerativeWork';
import { WORK_LIST } from '../../Global/WorkList';
import WorkSelector from "../Organisms/HomePageChildren/WorkSelector";


type Props = {
  sampleProp ?: any;
}

export const HomePage : React.FC <Props> = ({ sampleProp }) => {

  // ___ state ___ ___ ___ ___ ___
  const [ sampleState, setSampleState ] = useState<string>('This is SampleState');
  const [ workIDToView, setWorkIDToView ] = useState<string>();

  // ___ use effect ___ ___ ___ ___ ___
  // useEffect( () => { console.log(sampleState) }, [ sampleState ] );

  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  };

  const onclickSelector = (workID: string) => {
    setWorkIDToView(workID);
  }

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
  }

  return (

    <Grid container spacing = { 2 }>

      <Grid item xs = {2}>
        <WorkSelector updateParent = { onclickSelector }/>
      </Grid>

      <Routes>
        <Route path = { '/viewer?workID=' + workIDToView }   element = { <ViewerPage />} />
      </Routes>

    </Grid>

  );
};

export default HomePage