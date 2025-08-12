import styles from "./CreateForm.module.css";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import {
  companySchema,
  type CompanyFormType,
} from "../../schema/company.schema";
import { Country } from "../../constants/Country.enum";
import { GlobalMarket } from "../../constants/GlobalMarket.enum";
import { Status } from "../../constants/Status.enum";
import FormGroup from "../../components/FormGroup/FormGroup";

export default function CreateForm() {
  const navigate = useNavigate();
  const countryOptions = Object.values(Country);
  const globalMarketOptions = Object.values(GlobalMarket);
  const statusOptions = Object.values(Status);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(companySchema),
    defaultValues: {
      name: "",
      creationDate: new Date(),
      telephone: "",
      country: Country.USA,
      isGlobal: false,
      globalMarkets: [],
      globalMarketKeySecretIndex: "",
      projects: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const isGlobal = watch("isGlobal");

  const onSubmit = (data: CompanyFormType) => {
    console.log("Form submitted:", data);
    navigate("/");
  };

  const addProject = () => {
    append({ name: "", price: "", status: Status.COMPLETED });
  };
  return (
    <>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.form_grid}>
          <div className={styles.form_group}>
            <FormGroup
              htmlFor="name"
              label="Company name"
              controllerProps={{
                name: "name",
                control: control,
                render: ({ field }) => (
                  <input
                    type="text"
                    id="name"
                    placeholder="Type company name"
                    {...field}
                  />
                ),
              }}
            />
            {errors.name && (
              <span className={styles.error_message}>
                {errors.name.message}
              </span>
            )}
          </div>
          <div className={styles.form_group}>
            <FormGroup
              htmlFor="creationDate"
              label="Creation date"
              controllerProps={{
                name: "creationDate",
                control: control,
                render: ({ field }) => (
                  <input
                    type="date"
                    id="creationDate"
                    {...field}
                    value={
                      field.value instanceof Date
                        ? field.value.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                ),
              }}
            />
            {errors.creationDate && (
              <span className={styles.error_message}>
                {errors.creationDate.message}
              </span>
            )}
          </div>

          <div className={styles.form_group}>
            <FormGroup
              htmlFor="telephone"
              label="Telephone (not required)"
              controllerProps={{
                name: "telephone",
                control: control,
                render: ({ field }) => (
                  <input
                    type="tel"
                    id="telephone"
                    placeholder="+1-555-123-4567"
                    {...field}
                    value={field.value || ""}
                  />
                ),
              }}
            />
            {errors.telephone && (
              <span className={styles.error_message}>
                {errors.telephone.message}
              </span>
            )}
          </div>

          <div className={styles.form_group}>
            <FormGroup
              htmlFor="country"
              label="Country"
              controllerProps={{
                name: "country",
                control: control,
                render: ({ field }) => (
                  <select id="country" {...field}>
                    {countryOptions.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                ),
              }}
            />
            {errors.country && (
              <span className={styles.error_message}>
                {errors.country.message}
              </span>
            )}
          </div>

          <div className={styles.form_group}>
            <label>Global company</label>
            <div className={styles.radio_group}>
              <label>
                <Controller
                  name="isGlobal"
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
                  name="isGlobal"
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
          </div>

          {isGlobal && (
            <>
              <div className={styles.form_group}>
                <FormGroup
                  htmlFor="globalMarkets"
                  label="Global markets"
                  controllerProps={{
                    name: "globalMarkets",
                    control: control,
                    render: ({ field }) => (
                      <select
                        id="globalMarkets"
                        multiple
                        {...field}
                        value={field.value as GlobalMarket[]}
                        onChange={(e) =>
                          field.onChange(
                            Array.from(e.target.selectedOptions).map(
                              (option) => option.value as GlobalMarket,
                            ),
                          )
                        }
                      >
                        {globalMarketOptions.map((market) => (
                          <option key={market} value={market}>
                            {market}
                          </option>
                        ))}
                      </select>
                    ),
                  }}
                />
                {errors.globalMarkets && (
                  <span className={styles.error_message}>
                    {errors.globalMarkets.message}
                  </span>
                )}
              </div>

              <div className={styles.form_group}>
                <FormGroup
                  htmlFor="globalMarketKeySecretIndex"
                  label="Global market index"
                  controllerProps={{
                    name: "globalMarketKeySecretIndex",
                    control: control,
                    render: ({ field }) => (
                      <input
                        type="text"
                        id="globalMarketKeySecretIndex"
                        placeholder="GMI-2025-XYZ"
                        {...field}
                        value={field.value || ""}
                      />
                    ),
                  }}
                />
                {errors.globalMarketKeySecretIndex && (
                  <span className={styles.error_message}>
                    {errors.globalMarketKeySecretIndex.message}
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        <div className={styles.form_group}>
          <h3>Add project (not required)</h3>
          <button
            type="button"
            onClick={addProject}
            className={styles.add_project_btn}
          >
            Add new project
          </button>

          {fields.length > 0 && (
            <div className={styles.project_list}>
              <h4>Added projects:</h4>
              <div className={styles.project_grid}>
                {fields.map((project, index) => (
                  <div key={project.id} className={styles.project_item}>
                    <div className={styles.form_group}>
                      <FormGroup
                        htmlFor={`projects.${index}.name`}
                        label="Project name"
                        controllerProps={{
                          name: `projects.${index}.name`,
                          control: control,
                          render: ({ field }) => (
                            <input
                              type="text"
                              id={`projects.${index}.name`}
                              placeholder="Type project name"
                              {...field}
                            />
                          ),
                        }}
                      />
                      {errors.projects?.[index]?.name && (
                        <span className={styles.error_message}>
                          {errors.projects[index]?.name?.message}
                        </span>
                      )}
                    </div>

                    <div className={styles.form_group}>
                      <FormGroup
                        htmlFor={`projects.${index}.price`}
                        label="Price"
                        controllerProps={{
                          name: `projects.${index}.price`,
                          control: control,
                          render: ({ field }) => (
                            <input
                              type="text"
                              id={`projects.${index}.price`}
                              placeholder="10,00"
                              {...field}
                            />
                          ),
                        }}
                      />
                      {errors.projects?.[index]?.price && (
                        <span className={styles.error_message}>
                          {errors.projects[index]?.price?.message}
                        </span>
                      )}
                    </div>

                    <div className={styles.form_group}>
                      <FormGroup
                        htmlFor={`projects.${index}.status`}
                        label="Status"
                        controllerProps={{
                          name: `projects.${index}.status`,
                          control: control,
                          render: ({ field }) => (
                            <select id={`projects.${index}.status`} {...field}>
                              {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          ),
                        }}
                      />
                      {errors.projects?.[index]?.status && (
                        <span className={styles.error_message}>
                          {errors.projects[index]?.status?.message}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className={styles.remove_project_btn}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button type="submit" className={styles.submit_btn}>
          Create company
        </button>
      </form>
    </>
  );
}
