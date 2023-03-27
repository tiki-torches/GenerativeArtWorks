import  { GenerativeWork } from './GenerativeWork'
import { SampleWork1 } from './Samples/SampleWork1'
import { SampleWork2 } from './Samples/SampleWork2'
import { NotFound } from './NotFound'
import { WorkA } from '../Workfiles/WorkA'


export const WORK_LIST: Array<any> = [
  SampleWork1,
  SampleWork2,
  WorkA,
  NotFound
]