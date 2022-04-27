import axios from "axios";
import { $handler } from "server/api-utils";

export default $handler(async (req, res) => {
  const { id } = req.query;
  const providerId = Array.isArray(id) ? id.join("/") : id;
  const response = await axios.get(
    `https://registry.terraform.io/v2/providers/${providerId}`
  );
  res.status(200).json(response.data.data);
});
