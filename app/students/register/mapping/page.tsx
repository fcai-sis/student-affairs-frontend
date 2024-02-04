import { redirect } from "next/navigation";

import updateMappingAction from "./action";
import { readActiveRegistrationSession } from "@/app/api";

export default async function Page() {
  const activeRegistrationSession = await readActiveRegistrationSession();

  if (!activeRegistrationSession) {
    return redirect("/students/register");
  }

  const { mapping, excelColumnsHeaders } = activeRegistrationSession;

  // create a table with 2 columns, one for mapping key and the other for mapping value
  // when mapping value cell is clicked, it should display a dropdown with the excelColumnsHeaders
  return (
    <div>
      <h1>Mapping</h1>
      <div className="table">
        <div>
          <div className="table-row">
            <div className="table-cell">Mapping Key</div>
            <div className="table-cell">Mapping Value</div>
          </div>
        </div>
        <form action={updateMappingAction}>
          <div>
            {Object.entries(mapping).map(([key, value]) => (
              <div className="table-row" key={key}>
                <div className="table-cell">{key}</div>
                <div className="table-cell">
                  <select name={key} defaultValue={value}>
                    <option value="<unset>" disabled>
                      Select a column
                    </option>
                    {excelColumnsHeaders.map((header) => (
                      <option key={header} value={header}>
                        {header}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
