import { $handler, ApiError, param } from "server/api-utils";
import { getTerraformState } from "server/services/terraform/state-manager";

export default $handler(async (req, res) => {
  const item = await getTerraformState({
    name: param(req.query.id),
    workspace: param(req.query.workspace),
  });
  if (!item) {
    throw new ApiError(404, "Not Found");
  }
  res.status(200).json(item);
});
