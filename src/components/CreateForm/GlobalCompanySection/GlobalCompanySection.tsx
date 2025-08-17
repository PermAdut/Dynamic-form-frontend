import type { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import { type CompanyFormType } from "../../../schema/company.schema";
import { GlobalMarket } from "../../../constants/GlobalMarket.enum";
import FormGroup from "../FormGroup/FormGroup";
import ValidationError from "../ValidationError/ValidationError";
import RadioGroup from "../RadioGroup/RadioGroup";
import SelectField from "../SelectField/SelectField";
import InputField from "../InputField/InputField";
import styles from "../CreateForm/CreateForm.module.css";
import type { ICompany } from "../../../interfaces/Company.interface";

interface GlobalCompanySectionProps {
  control: Control<ICompany, unknown, CompanyFormType>;
  errors: FieldErrors<CompanyFormType>;
  isGlobal: boolean;
  setValue: UseFormSetValue<ICompany>;
}

export default function GlobalCompanySection({
  control,
  errors,
  isGlobal,
  setValue,
}: GlobalCompanySectionProps) {
  const globalMarketOptions = Object.values(GlobalMarket);

  return (
    <>
      <div className={styles.form_group}>
        <label>Global company</label>
        <RadioGroup control={control} name="isGlobal" setValue={setValue} />
      </div>

      {isGlobal && (
        <>
          <div className={styles.form_group}>
            <FormGroup
              htmlFor="globalMarkets"
              label="Global markets"
              controllerProps={{
                name: "globalMarkets",
                control,
                render: ({ field }) => (
                  <SelectField
                    id="globalMarkets"
                    options={globalMarketOptions}
                    multiple
                    {...field}
                    value={field.value as string[]}
                    onChange={(e) =>
                      field.onChange(
                        Array.from(e.target.selectedOptions).map(
                          (option) => option.value as GlobalMarket,
                        ),
                      )
                    }
                  />
                ),
              }}
            />
            <ValidationError
              isError={Boolean(errors.globalMarkets)}
              message={errors.globalMarkets?.message}
            />
          </div>

          <div className={styles.form_group}>
            <FormGroup
              htmlFor="globalMarketKeySecretIndex"
              label="Global market index"
              controllerProps={{
                name: "globalMarketKeySecretIndex",
                control,
                render: ({ field }) => (
                  <InputField
                    type="text"
                    id="globalMarketKeySecretIndex"
                    placeholder="GMI-2025-XYZ"
                    {...field}
                    value={typeof field.value == "string" ? field.value : ""}
                  />
                ),
              }}
            />
            <ValidationError
              isError={Boolean(errors.globalMarketKeySecretIndex)}
              message={errors.globalMarketKeySecretIndex?.message}
            />
          </div>
        </>
      )}
    </>
  );
}
