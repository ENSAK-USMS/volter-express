import { ProfileType } from 'app/shared/model/enumerations/profile-type.model';

export interface IProfile {
  id?: string;
  phone?: string | null;
  companyName?: string | null;
  companyAddress?: string | null;
  companyCity?: string | null;
  companyPostalCode?: string | null;
  companyCountry?: string | null;
  country?: string | null;
  city?: string | null;
  streetName?: string | null;
  locationLat?: number | null;
  locationLon?: number | null;
  profileType?: keyof typeof ProfileType | null;
}

export const defaultValue: Readonly<IProfile> = {};
