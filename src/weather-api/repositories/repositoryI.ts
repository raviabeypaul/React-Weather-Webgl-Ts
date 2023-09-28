import { User } from "sample-app/entities/UserEntity";


export interface Repository<RecordType> {
  create: (payload: RecordType) => any;
  get: (id: string) => any;
  query: (
      query: Record<string, any>,
      startingOffset: number,
      resultLimit: number
    ) => any;
  update: (payload: Partial<RecordType>) => any;
}
