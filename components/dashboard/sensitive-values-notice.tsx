export const SensitiveValuesNotice = () => {
  return (
    <p className="bg-slate-200 p-2 rounded-md mt-6">
      <b>NOTE:</b> Sensitive values may be{" "}
      <i>
        {"<<"}&nbsp;REDACTED&nbsp;{">>"}
      </i>{" "}
      for security reasons
    </p>
  );
};
