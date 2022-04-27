import { ButtonPrimary } from "components/core/Buttons";
import { useState } from "react";

const Window: any = typeof window !== "undefined" ? window : {};

export const DemoNotice = () => {
  const demoModeAcked = Window._demo_mode_acked;

  const [acked, setAcked] = useState(demoModeAcked);

  if (process.env.NEXT_PUBLIC_DEMO_MODE !== "true") {
    return null;
  }

  const onAck = () => {
    Window._demo_mode_acked = true;
    setAcked(true);
  };

  if (acked) return null;

  return (
    <div className="p-4 border rounded-lg mb-4 bg-gray-100">
      <h2 className="mb-4">Hi there!</h2>
      <p>
        If you are seeing this, that means that Terraformation is being run in
        the <b>demo mode</b>!
      </p>
      <p>
        Below are some real Terraform states hosted in an example S3 bucket to
        demonstrate what Terraformation is capable of doing. Feel free to click
        around and explore the UI and when you want to get started with your own
        Terraformation deployment, head over to{" "}
        <a href="https://github.com/benjackwhite/terraformation">
          our Github repo
        </a>{" "}
        to find out how to deploy your own installation connected to your own
        remote Terraform backend.
      </p>

      <ButtonPrimary onClick={() => onAck()}>Got it, thanks!</ButtonPrimary>
    </div>
  );
};
