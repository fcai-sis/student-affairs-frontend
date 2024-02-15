"use client";
import { useFormState } from "react-dom";
import validateMapping from "./map-action";
import Button from "@/components/Button";
import { LongArrowUpRightIcon, NavArrowLeftIcon } from "@/components/icons";

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
    <>
      <div>
        <p className='flex w-[387] h-min text-slate-400 text-sm '>
          من فضلك قم بربط الأعمدة الصحيحة في ملف الإكسل بالأعمدة المقابلة لها في
          قاعدة البيانات
        </p>
      </div>
      <div>
        <form action={formAction}>
          {mappingKeys.map((field, index) => (
            <div
              className='w-min h-[100px] flex justify-center gap-8 gap-y-16'
              key={index}
            >
              <div className='w-[142px] h-max flex flex-col items-start'>
                <label className='w-max h-max flex ' htmlFor={field}>
                  {field}
                </label>
              </div>
              <div className='w-[142px] h-max flex flex-col items-start'>
                <select
                  className='flex flex-col w-max h-max justify-end'
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
              </div>
            </div>
          ))}
          <div className='w-max h-min flex justify-center gap-4'>
            <Button
              variant='secondary'
              icon={<LongArrowUpRightIcon className='stroke-slate-400' />}
            >
              Back
            </Button>
            <Button
              variant='primary'
              icon={<NavArrowLeftIcon className='stroke-slate-50' />}
              type='submit'
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
