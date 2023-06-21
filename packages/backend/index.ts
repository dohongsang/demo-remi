import { Application } from "./src/core/server";
import routingControllers from "./src/modules";

const application = new Application();
application.init(routingControllers);
application.start();
