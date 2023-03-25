import React, { useEffect, useState } from "react";

type Props = {
  sampleProp ?: any;
}

export const HomePage : React.FC <Props> = ({ sampleProp }) => {

  // ___ state ___ ___ ___ ___ ___
  const [ sampleState, setSampleState ] = useState<string>('This is SampleState');

  // ___ use effect ___ ___ ___ ___ ___
  // useEffect( () => { console.log(sampleState) }, [ sampleState ] );

  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  };

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
  }

  return (
    <div>
      <h2>{ HomePage.name }</h2>
      <h3>latest information</h3>
      <h3>user's works list</h3>
      <h3>premade works list</h3>
    </div>
  );
};

export default HomePage