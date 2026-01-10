import v1_router from "@/routes/api/v1.route";
import { createRouter } from "@/utils/router";

const api = createRouter();

api.route("/v1", v1_router);

export default api;
