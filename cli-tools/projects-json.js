const path = require("path");
const fs = require("fs");

const allIllustrationsPath = path.resolve("src", "illustrations");
console.log(`Searching illustrations in:`);
console.log(allIllustrationsPath);

const directoryNames = fs.readdirSync(allIllustrationsPath);
console.log("Found the following illustrations:");
console.log(directoryNames);

const projects = directoryNames.map((directoryName) => {
  const configPath = path.resolve(
    allIllustrationsPath,
    directoryName,
    "config.json"
  );
  const stringContent = fs.readFileSync(configPath).toString();
  const config = JSON.parse(stringContent);
  return { dir: directoryName, ...config };
});

// Sort by order
projects.sort((project1, project2) => {
  return project1.order - project2.order;
});

const projectsJsonPath = path.resolve("src", "projects.json");
const jsonData = JSON.stringify({ projects }, null, 2);
fs.writeFileSync(projectsJsonPath, jsonData);

console.log("Wrote projects to", projectsJsonPath);
