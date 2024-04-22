export interface IReceiver {
  id?: string;
  name?: string | null;
  country?: string | null;
  city?: string | null;
  email?: string | null;
  phone?: string | null;
  streetName?: string | null;
  location?: number | null;
}

export const defaultValue: Readonly<IReceiver> = {};
