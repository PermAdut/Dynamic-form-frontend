import styles from "./CreateForm.module.css";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router";
import {
  companySchema,
  type CompanyFormType,
} from "../../schema/company.schema";
import { createCompany } from "../../api/createCompany";
import { editCompany } from "../../api/editCompany";
import BasicSectionInfo from "../BasicSectionInfo/BasicSectionInfo";
import GlobalCompanySection from "../GlobalCompanySection/GlobalCompanySection";
import ProjectsSection from "../ProjectSection/ProjectSection";
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
    formState: { errors },
    setValue,
  } = useForm({
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

  const getChangedParams = (
    data: CompanyFormType,
  ): Partial<
    Record<keyof CompanyFormType, CompanyFormType[keyof CompanyFormType]>
  > => {
    const result: Partial<
      Record<keyof CompanyFormType, CompanyFormType[keyof CompanyFormType]>
    > = {};

    for (const key in data) {
      const typedKey = key as keyof CompanyFormType;
      const currentValue = data[typedKey];
      const originalValue = props[typedKey];
      if (
        typeof originalValue == typeof currentValue &&
        JSON.stringify(originalValue) !== JSON.stringify(currentValue)
      ) {
        result[typedKey] = currentValue;
      }
    }

    return result;
  };

  const onSubmit = async (data: CompanyFormType) => {
    console.log("Form submitted:", data);
    try {
      if (!id) await createCompany(data);
      else {
        const usedParams: Partial<
          Record<keyof CompanyFormType, CompanyFormType[keyof CompanyFormType]>
        > = getChangedParams(data);
        await editCompany(id, usedParams);
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
