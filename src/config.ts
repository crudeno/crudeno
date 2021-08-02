import { Schema } from '../deps.ts'

type ApiType = 'graphql' | 'rest'
type DatabaseType = 'mongodb' | 'mysql' | 'postegresql' | 'sqlite'

export default interface Config {
  readonly ENTITY: string;
  readonly SCHEMA: Schema;
  readonly HOST?: string;
  readonly PORT?: number;

  readonly API_TYPE?: ApiType;
  readonly API_PATH?: string;

  readonly DATABASE_TYPE: DatabaseType;
  readonly DATABASE_HOST: string;
  readonly DATABASE_PORT: string;
  readonly DATABASE_NAME: string;
  readonly DATABASE_USER?: string;
  readonly DATABASE_PASS?: string;
  readonly DATABASE_PATH?: string;
}
