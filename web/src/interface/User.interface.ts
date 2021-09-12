export interface IUser {
  readonly gender: 'male' | 'female';
  readonly name: {
      readonly title: 'Mr' | 'Mrs' | 'Miss';
      readonly first: string;
      readonly last: string;
  };
  readonly location: {
      readonly street: {
          readonly number: number;
          readonly name: string;
      };
      readonly city: string;
      readonly state: string;
      readonly country: string;
      readonly postcode: string;
      readonly coordinates: {
          readonly latitude: number;
          readonly longitude: number;
      };
      readonly timezone: {
          readonly offset: string;
          readonly description: string;
      };
  };
  readonly email: string;
  readonly login: {
      readonly uuid: string;
      readonly username: string;
      readonly password: string;
      readonly salt: string;
      readonly md5: string;
      readonly sha1: string;
      readonly sha256: string;
  };
  readonly dob: {
      readonly date: string;
      readonly age: number;
  };
  readonly registered: {
      readonly date: string;
      readonly age: number;
  };
  readonly phone: string;
  readonly cell: string;
  readonly id: {
      readonly name?: string;
      readonly value: string | null;
  };
  readonly picture: {
      readonly large: string;
      readonly medium: string;
      readonly thumbnail: string;
  };
  readonly nat: string;
}
