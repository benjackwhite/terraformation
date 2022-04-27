import { CopyToClipboardButton } from "components/core/CopyToClipboardButton";
import { SelectBox } from "components/core/Inputs";
import { SwrWrapper } from "components/core/Swr";
import { DashboardAppLayout } from "components/dashboard/layout";
import { SensitiveValuesNotice } from "components/dashboard/sensitive-values-notice";
import { useCurrentTerraformState } from "lib/hooks/useTerraformStates";
import type { NextPage } from "next";
import { useMemo, useState } from "react";
import YAML from "yaml";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

const AppJsonPage: NextPage = () => {
  const terrafromStateSwr = useCurrentTerraformState();
  const { data: currentState, error: loadError } = terrafromStateSwr;

  const [format, setFormat] = useState("JSON");

  const content = useMemo(() => {
    if (!currentState) return;

    return format === "YAML"
      ? YAML.stringify(currentState)
      : JSON.stringify(currentState, null, 2);
  }, [format, currentState]);

  return (
    <DashboardAppLayout
      renderSidebar={() => (
        <>
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <label>Format </label>
              <SelectBox
                options={["YAML", "JSON"]}
                value={format}
                onChange={setFormat}
              />
            </li>
          </ul>
          <SensitiveValuesNotice />
        </>
      )}
    >
      <SwrWrapper
        swr={terrafromStateSwr}
        render={() => (
          <div className="relative">
            <span className="absolute right-2 top-2">
              <CopyToClipboardButton text={content || ""} />
            </span>
            <SyntaxHighlighter
              language={format === "YAML" ? "yaml" : "json"}
              style={vscDarkPlus}
              customStyle={{
                borderRadius: "0.5em",
                height: "80vh",
              }}
            >
              {content}
            </SyntaxHighlighter>
          </div>
        )}
        renderError={() => <p>Missing</p>}
        renderLoading={() => <p>Loading</p>}
      />
    </DashboardAppLayout>
  );
};

export default AppJsonPage;
