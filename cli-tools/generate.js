const path = require("path");
const fs = require("fs");

if (process.argv.length < 3) {
  console.log("component name not specified.");
  process.exit(0);
}

const componentName = process.argv[2];
console.log(`Component to be created: ${componentName}`);

const componentDirPath = path.resolve("src", "illustrations", componentName);
if (fs.existsSync(componentDirPath)) {
  console.log(`"${componentDirPath.toString()}" already exists.`);
  process.exit(0);
}
fs.mkdirSync(componentDirPath);
console.log("Created directory for component:", componentName);
console.log("Path:", componentDirPath);

const builderPath = path.resolve("src", "illustrations", "template");
const builderFileNames = fs.readdirSync(builderPath);
for (const builderFileName of builderFileNames) {
  const builderFilePath = path.resolve(builderPath, builderFileName);
  const fileContent = fs.readFileSync(builderFilePath).toString();
  const destination = path.resolve(componentDirPath, builderFileName);
  fs.writeFileSync(destination, fileContent);
  console.log(`CREATE FILE ${destination}`);
}
