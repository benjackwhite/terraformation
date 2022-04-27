import { Button } from "components/core/Buttons";
import { TerraformState } from "types/TerraformState";
import Link from "next/link";

export interface StatePreviewProps {
  name: string;
  workspaces: string[];
}

export const StatePreview = ({ name, workspaces }: StatePreviewProps) => {
  let shortName = name;
  let suffix = "";

  if (name.endsWith(".tfstate")) {
    suffix = ".tfstate";
    shortName = name.substring(0, name.length - suffix.length);
  }
  return (
    <Link
      href={`/dashboard/view-state/?name=${name}&workspace=${workspaces[0]}`}
    >
      <a className="p-4 bg-white border rounded-lg border-x-gray-200 flex justify-between items-center">
        <span className="overflow-hidden overflow-ellipsis whitespace-nowrap font-bold">
          {shortName}
          <span className="opacity-30">{suffix}</span>
        </span>
        <span className="flex space-x-2">
          {workspaces.map((x) => (
            <Button key={x}>{x}</Button>
          ))}
        </span>
      </a>
    </Link>
  );
};
