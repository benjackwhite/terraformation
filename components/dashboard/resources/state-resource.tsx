import { Button } from "components/core/Buttons";
import { TerraformStateContentResource } from "types/TerraformState";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { RiFileList2Line, RiExternalLinkLine } from "react-icons/ri";
import cs from "classnames";

import { useTerraformProvider } from "lib/hooks/useTerraformProviders";
import { TerraformProvider } from "types/TerraformProvider";
import { ARN } from "link2aws";

export interface StateResourceProps {
  resource: TerraformStateContentResource;
}

export const StateResource = ({ resource }: StateResourceProps) => {
  const router = useRouter();
  const _expanded = router.asPath.split("#")[1] === resource.id;
  const [expanded, setExpanded] = useState(_expanded);

  const providerId = useMemo(
    () => resource.provider.split('"')[1].replace("registry.terraform.io/", ""),
    [resource.provider]
  );

  const externalLink = useMemo(() => getExternalLink(resource), [resource]);

  const { data: providerInfo } = useTerraformProvider(providerId);

  const onHeaderClick = (e: any) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  const info = providerInfo
    ? getProviderInfo(providerInfo, resource)
    : undefined;

  return (
    <div
      id={resource.id}
      className="block bg-white border rounded-lg border-x-gray-200 transition max-w-full overflow-hidden"
    >
      {/* header */}
      <div className="flex">
        <span
          style={{
            writingMode: "vertical-rl",
          }}
          className={cs("font-bold", "text-xs", "p-1", "text-center", {
            "bg-indigo-100": resource.mode !== "data",
            "text-indigo-500": resource.mode !== "data",
            "bg-slate-100": resource.mode === "data",
            "text-slate-500": resource.mode === "data",
          })}
        >
          {resource.mode === "data" ? "DATA" : "RES"}
        </span>
        <a
          href={`#${resource.id}`}
          title={resource.id}
          className="cursor-pointer grow hover:bg-slate-50 text-sm rounded-md m-1 p-1 whitespace-nowrap overflow-hidden grow"
          onClick={onHeaderClick}
        >
          <span className="mb-2 flex space-x-2 items-center">
            {info?.logoUrl ? (
              <img
                src={info?.logoUrl}
                width={20}
                height={20}
                className={"rounded-sm"}
              />
            ) : null}
            <span>
              <b>{resource.type}</b> {resource.name}
            </span>
          </span>
          <span className="block text-xs text-slate-400 font-mono overflow-hidden text-ellipsis">
            {resource.id}
          </span>
        </a>

        <div className="space-x-2 ml-2 p-2 shrink-0">
          {externalLink ? (
            <a href={externalLink} target="_blank" rel="noopener noreferrer">
              <Button size="small" LeftIcon={RiExternalLinkLine} title="Open" />
            </a>
          ) : null}
          {info?.docsLink ? (
            <a href={info?.docsLink} target="_blank" rel="noopener noreferrer">
              <Button
                size="small"
                LeftIcon={RiFileList2Line}
                title="Terraform Docs"
              />
            </a>
          ) : null}
        </div>
      </div>

      {/* expanded */}
      {expanded ? (
        <div className="overflow-hidden">
          <div className="border-b border-b-slate-100" />
          <div className="p-4 text-xs">
            {resource.instances?.map((x) => (
              <table key={x.index_key} className="w-full">
                {Object.keys(x.attributes).map((attr) => (
                  <tr key={attr} className="border-b border-b-slate-100">
                    <td className="font-bold py-1 pr-8 w-1/3">{attr}</td>
                    <td className="overflow-hidden font-mono">
                      <code>{JSON.stringify(x.attributes[attr])}</code>
                    </td>
                  </tr>
                ))}
              </table>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const getProviderInfo = (
  provider: TerraformProvider,
  resource: TerraformStateContentResource
) => {
  const { mode, type } = resource;

  const { name, namespace, "logo-url": logoUrl } = provider.attributes;

  const fullLogoUrl = logoUrl.startsWith("/")
    ? `https://registry.terraform.io${logoUrl}`
    : logoUrl;

  const docsSub = mode === "data" ? "data-sources" : "resources";
  const shortType = type.split("_").slice(1).join("_");
  const docsLink = provider
    ? `https://registry.terraform.io/providers/${namespace}/${name}/latest/docs/${docsSub}/${shortType}`
    : undefined;

  return {
    logoUrl: fullLogoUrl,
    docsLink,
  };
};

const getExternalLink = (resource: TerraformStateContentResource) => {
  const arn = resource.instances[0]?.attributes?.arn;
  if (arn) {
    try {
      return new ARN(arn).consoleLink;
    } catch (e: any) {
      return;
    }
  }
};
