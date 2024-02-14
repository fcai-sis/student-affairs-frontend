"use client";
import { useFormState } from "react-dom";
import validateMapping from "./map-action";

export default function MapForm({
  headers,
  mapping,
}: {
  headers: string[];
  mapping: { [key: string]: string };
}) {
  // Headers is an array of strings that represent the headers of the excel file
  // Mapping is an object with field names as keys
  const mappingKeys = Object.keys(mapping);
  const [state, formAction] = useFormState(validateMapping, null);

  return (
    <div>
      <h1>MapForm</h1>
      <ul>
        <form action={formAction}>
          {mappingKeys.map((field, index) => (
            <li key={index}>
              <label htmlFor={field}>{field}</label>
              <select
                required={true}
                name={field}
                defaultValue={mapping[field]}
              >
                <option disabled={true} value='<unset>'>
                  Select the column that this field represents
                </option>
                {headers.map((header, index) => (
                  <option key={index} value={header}>
                    {header}
                  </option>
                ))}
              </select>
            </li>
          ))}
          <button type='submit'>Submit</button>
        </form>
      </ul>
    </div>
  );
}
