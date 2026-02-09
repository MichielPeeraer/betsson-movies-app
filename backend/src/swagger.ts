import YAML from "yamljs";
import path from "path";

// Load the YAML file directly
const swaggerSpec = YAML.load(path.join(__dirname, "../swagger.yaml"));

export { swaggerSpec };
