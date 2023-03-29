import  { GenerativeWork } from './GenerativeWork'
import { SampleWork1 } from './Samples/SampleWork1'
import { SampleWork2 } from './Samples/SampleWork2'
import { SampleWorkLine } from './Samples/SampleWorkLine'
import { SampleWorkPerlinNoiseLine } from './Samples/SampleWorkPerlinNoiseLine'
import { NotFound } from './NotFound'
import { JustLowerRightRotateFaster } from '../Workfiles/JustLowerRightRotateFaster'
import { PerlinNoiseLine } from '../Workfiles/PerlinNoiseLine'

export const WORK_LIST: Array<any> = [

  SampleWork1,
  SampleWork2,
  SampleWorkLine,
  SampleWorkPerlinNoiseLine,

  JustLowerRightRotateFaster,
  PerlinNoiseLine,

  NotFound

]