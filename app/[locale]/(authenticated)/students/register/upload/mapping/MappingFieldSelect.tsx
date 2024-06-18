"use client";

import { useI18n } from "@/locales/client";
import toast from "react-hot-toast";
import { updateMapping } from "./actions";

type MappingFieldSelectProps = {
  fieldName: string;
  defaultValue: string;
  options: string[];
};

export default function MappingFieldSelect({
  fieldName,
  defaultValue,
  options,
}: MappingFieldSelectProps) {
  const t = useI18n();
  return (
    <select
      id={fieldName}
      defaultValue={defaultValue}
      name={fieldName}
      onChange={async (e) => {
        const value = e.target.value;
        const updateMappingResponse = await updateMapping({ fieldName, value });
        if (!updateMappingResponse.success) {
          console.error(
            `Failed to update mapping for field ${fieldName} to value ${value}`
          );
          return toast.error(
            t("registerStudent.upload.mapping.error.updateFailed")
          );
        }
        toast.success(t("registerStudent.upload.mapping.success.updateField"));
      }}
    >
      <option value="<unset>">
        {t("registerStudent.upload.mapping.unset")}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
