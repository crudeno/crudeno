import { Database as Connection } from '../../deps.ts'

export default interface DatabaseContract {
  connect(): Connection;
}
