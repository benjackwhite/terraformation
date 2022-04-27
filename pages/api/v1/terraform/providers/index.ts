import axios from "axios";
import { $handler } from "server/api-utils";

export default $handler(async (req, res) => {
  const response = await axios.get(
    "https://registry.terraform.io/v2/providers",
    {
      params: {
        "filter[tier]": "official,partner,community",
        "page[number]": "1",
        "page[size]": "1000",
      },
    }
  );
  res.status(200).json(response.data);
});
