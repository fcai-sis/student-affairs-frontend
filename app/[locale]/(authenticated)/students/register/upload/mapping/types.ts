export type Mapping = Record<string, string>;
export type FieldNames = Record<string, { en: string; ar: string }>;
export type GetActiveRegistrationSessionResponse = {
  registrationSession: {
    mapping: Mapping;
    excelColumnsHeaders: string[];
  };
  fieldNames: FieldNames;
};
