
type entityPropertiesType = {
  key: string, // component key
  visual: boolean,
  track: boolean
};
type entitiesControlType = {
  clockIsCurrent: boolean,
  camerIsFlyTo: boolean,
  camerFlyToPosition: number[],
  entitiesProperties: entityPropertiesType[]
};

export type {
  entitiesControlType,
  entityPropertiesType
}

