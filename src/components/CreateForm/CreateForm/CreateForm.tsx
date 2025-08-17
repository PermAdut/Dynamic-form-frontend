import styles from "./CreateForm.module.css";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router";
import {
  companySchema,
  type CompanyFormType,
} from "../../../schema/company.schema";
import BasicSectionInfo from "../BasicSectionInfo/BasicSectionInfo";
import GlobalCompanySection from "../GlobalCompanySection/GlobalCompanySection";
import ProjectsSection from "../ProjectSection/ProjectSection";
import { isEqual } from "../../../helpers/isEqual";
import companyApi from "../../../api/company.api";
import type { ICompany } from "../../../interfaces/Company.interface";

export interface CreateFormProps extends CompanyFormType {
  btnText: string;
}

export default function CreateForm(props: CreateFormProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
    setValue,
  } = useForm<ICompany, unknown, CompanyFormType>({
    resolver: yupResolver(companySchema),
    defaultValues: {
      name: props.name,
      creationDate: props.creationDate,
      telephone: props.telephone,
      country: props.country,
      isGlobal: props.isGlobal,
      globalMarkets: props.globalMarkets,
      globalMarketKeySecretIndex: props.globalMarketKeySecretIndex,
      projects: props.projects,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const isGlobal = watch("isGlobal");

  const onSubmit = async (data: CompanyFormType) => {
    console.log(dirtyFields);
    try {
      if (!id) {
        await companyApi.createCompany(data);
        console.log("Form submited: ", data);
      } else {
        const changedParams: Partial<
          Record<keyof CompanyFormType, CompanyFormType[keyof CompanyFormType]>
        > = {};
        (Object.keys(data) as (keyof CompanyFormType)[]).forEach((key) => {
          if (!isEqual(data[key], props[key]) && data[key] !== null) {
            changedParams[key] = data[key];
          }
        });
        await companyApi.editCompany(id, changedParams);
        console.log("Form edited: ", changedParams);
      }
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.form_grid}>
          <BasicSectionInfo control={control} errors={errors} />
          <GlobalCompanySection
            control={control}
            errors={errors}
            isGlobal={isGlobal}
            setValue={setValue}
          />
        </div>
        <ProjectsSection
          control={control}
          errors={errors}
          fields={fields}
          append={append}
          remove={remove}
        />
        <button type="submit" className={styles.submit_btn}>
          {props.btnText}
        </button>
      </form>
    </>
  );
}
