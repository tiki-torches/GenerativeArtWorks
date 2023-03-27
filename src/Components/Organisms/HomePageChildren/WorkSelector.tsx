import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { WORK_LIST } from "../../../Works/Management/WorkList";
import { Link } from 'react-router-dom'


/**
 * Outline	: XXXするComponent
 * Logic		: - AAAをBBBにする
 *            - 親ComponentからCCCを受け取り、DDDとしたものを子Componentに渡す
 * View			: - KKKをリスト表示する
 */

// Type Declaration of Props
type Props = {
  updateParent: any;
}

export const WorkSelector: React.FC<Props> = ({ updateParent }) => {

  // ___ state ___ ___ ___ ___ ___
  const [ sampleState, setSampleState ] = useState<string>('This is SampleState');

  // ___ use effect ___ ___ ___ ___ ___

  // ___ event handler ___ ___ ___ ___ ___

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
  }
  
  return (
    <Grid container spacing = {2}>
      { WORK_LIST.map( (work) => {
        const selection = <Selection workID = { work.workID } updateParent = { updateParent }/>
        return <Grid item key = { work.workID }> { selection } </Grid>
      })}
    </Grid>
  );
};

type SelectionProps = {
  workID: string;
  updateParent: any;
}

const Selection: React.FC<SelectionProps> = ({workID, updateParent }) => {
  const onClickChip = (): void => {
    updateParent(workID);
  }

  return (

    <Link to = { '/viewer?workID=' + workID } style = { { textDecoration: 'none' , fontWeight: 'bold' } }>
      <Chip onClick = { onClickChip } label = { workID } variant = "outlined"/>
    </Link>

  );
}

export default WorkSelector