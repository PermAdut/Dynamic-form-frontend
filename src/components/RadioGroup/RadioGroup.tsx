import { type Control, Controller, type UseFormSetValue } from "react-hook-form";
import { type CompanyFormType } from "../../schema/company.schema";
import styles from "../CreateForm/CreateForm.module.css";

interface RadioGroupProps {
  control: Control<CompanyFormType>;
  name: "isGlobal";
  setValue: UseFormSetValue<CompanyFormType>;
}

export default function RadioGroup({ control, name, setValue }: RadioGroupProps) {
  return (
    <div className={styles.radio_group}>
      <label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              type="radio"
              checked={field.value === true}
              onChange={() => {
                field.onChange(true);
                if (!field.value) {
                  setValue("globalMarkets", []);
                  setValue("globalMarketKeySecretIndex", "");
                }
              }}
            />
          )}
        />
        Yes
      </label>
      <label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              type="radio"
              checked={field.value === false}
              onChange={() => {
                field.onChange(false);
                setValue("globalMarkets", []);
                setValue("globalMarketKeySecretIndex", "");
              }}
            />
          )}
        />
        No
      </label>
    </div>
  );
}