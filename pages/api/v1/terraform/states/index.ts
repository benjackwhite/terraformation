import { $handler } from "server/api-utils";
import { listTerraformStates } from "server/services/terraform/state-manager";

export default $handler(async (req, res) => {
  const items = await listTerraformStates();
  res.status(200).json({ items: items });
});
