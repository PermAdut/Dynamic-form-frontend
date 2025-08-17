import { array, boolean, date, object, string, type InferType } from "yup";
import { Status } from "../constants/Status.enum";
import { Country } from "../constants/Country.enum";
import { GlobalMarket } from "../constants/GlobalMarket.enum";

export const projectsSchema = object({
  name: string()
    .required("Project name required")
    .min(5, "Project name must be at least 5 symbols")
    .max(30, "Project name must max 30 symbols"),
  price: string()
    .required("Price required")
    .matches(/^\d+(,\d{2})?$/, "Price must have specified format, ex., 10,00"),
  status: string()
    .required("Status required")
    .oneOf(Object.values(Status), "Incorrect status"),
});

export const companySchema = object({
  name: string()
    .required("Company name required")
    .min(5, "Company name must be at least 5 symbols")
    .max(30, "Company name must max 30 symbols"),
  creationDate: date().required("Creation date required"),
  telephone: string()
    .notRequired()
    .when([], {
      is: (value: string) => value && value.length > 0,
      then: (schema) =>
        schema.matches(
          /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
          "Telephone doesn't match required format",
        ),
      otherwise: (schema) => schema,
    })
    .nonNullable(),
  country: string()
    .required("Company country required")
    .oneOf(Object.values(Country), "Invalid country"),
  isGlobal: boolean().required("Choose if company is global"),
  globalMarkets: array()
    .of(string().oneOf(Object.values(GlobalMarket), "Invalid global market"))
    .when("isGlobal", {
      is: true,
      then: (schema) =>
        schema
          .min(1, "Choose at least one global market")
          .required("Global markets required for a global company"),
      otherwise: (schema) => schema.notRequired(),
    }),
  globalMarketKeySecretIndex: string().when("isGlobal", {
    is: true,
    then: (schema) =>
      schema.required("Global market secret key index required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  projects: array().of(projectsSchema).notRequired().nonNullable(),
});

export type ProjectFormType = InferType<typeof projectsSchema>;
export type CompanyFormType = InferType<typeof companySchema>;

const defaultSchemaValues = (formProps: CompanyFormType): CompanyFormType => {
  return {
    name: formProps.name,
    country: formProps.country,
    isGlobal: formProps.isGlobal,
    creationDate: formProps.creationDate,
    telephone: formProps.telephone,
    globalMarketKeySecretIndex: formProps.globalMarketKeySecretIndex,
    globalMarkets: formProps.globalMarkets,
    projects: formProps.projects,
  };
};
export default defaultSchemaValues;