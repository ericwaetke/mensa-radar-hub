/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    tenants: Tenant;
    'opening-times': OpeningTime;
    recipes: Recipe;
    'mensa-info': MensaInfo;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
}
export interface User {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  roles: ('super-admin' | 'user')[];
  tenants?:
    | {
        tenant: number | Tenant;
        roles: ('admin' | 'user')[];
        id?: string | null;
      }[]
    | null;
  lastLoggedInTenant?: (number | null) | Tenant;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
export interface Tenant {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
}
export interface OpeningTime {
  id: number;
  title?: string | null;
  from?: string | null;
  to?: string | null;
  tenant?: (number | null) | Tenant;
  updatedAt: string;
  createdAt: string;
}
export interface Recipe {
  id: number;
  title: string;
  diet: 'vegetarian' | 'vegan' | 'meat' | 'fish';
  price?: {
    students?: number | null;
    employee?: number | null;
    other?: number | null;
  };
  nutrients?: {
    calories?: number | null;
    protein?: number | null;
    carbs?: number | null;
    fat?: number | null;
    fat_saturated?: number | null;
    sugar?: number | null;
    salt?: number | null;
  };
  tenant?: (number | null) | Tenant;
  updatedAt: string;
  createdAt: string;
}
export interface MensaInfo {
  id: number;
  name: string;
  slug?: string | null;
  address: {
    latitude: number;
    longitude: number;
    street?: string | null;
    houseNumber?: string | null;
    zipCode?: string | null;
    city?: string | null;
  };
  monday?: (number | OpeningTime)[] | null;
  tuesday?: (number | OpeningTime)[] | null;
  wednesday?: (number | OpeningTime)[] | null;
  thursday?: (number | OpeningTime)[] | null;
  friday?: (number | OpeningTime)[] | null;
  saturday?: (number | OpeningTime)[] | null;
  sunday?: (number | OpeningTime)[] | null;
  description: {
    [k: string]: unknown;
  }[];
  tenant?: (number | null) | Tenant;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}