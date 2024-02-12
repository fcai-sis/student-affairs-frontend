"use client";
import { useFormState } from "react-dom";
import validateMapping from "./map-action";

export default function MapForm({
  Headers,
  Mapping,
}: {
  Headers: string[];
  Mapping: { [key: string]: string };
}) {
  // Headers is an array of strings that represent the headers of the excel file
  // Mapping is an object with field names as keys
  const MappingKeys = Object.keys(Mapping);
  const [state, formAction] = useFormState(validateMapping, null);

  return (
    <div>
      <h1>MapForm</h1>
      <ul>
        <form action={formAction}>
          {MappingKeys.map((field, index) => (
            <li key={index}>
              <label htmlFor={field}>{field}</label>
              <select
                required={true}
                name={field}
                defaultValue={Mapping[field]}
              >
                <option disabled={true} value='<unset>'>
                  <p>Select the column that this field represents</p>
                </option>
                {Headers.map((header, index) => (
                  <option key={index} value={header}>
                    {header}
                  </option>
                ))}
              </select>
            </li>
          ))}
          <button type='submit'>
            <p>Submit</p>
          </button>
        </form>
      </ul>
    </div>
  );
}
