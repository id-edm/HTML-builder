const fs = require('fs');
const path = require('path');

const assetsPath = path.join(__dirname, 'assets');
const componentsPath = path.join(__dirname, 'components');
const stylesPath = path.join(__dirname, 'styles');
const templatePath = path.join(__dirname, 'template.html');
let templateHtml = '';

const distPath = path.join(__dirname, 'project-dist');
const distAssetsPath = path.join(distPath, 'assets');
const distHtmlPath = path.join(distPath, 'index.html');
const distCssPath = path.join(distPath, 'style.css');

async function buildProject() {
  await fs.promises.mkdir(distPath, { recursive: true });

  const templateData = await fs.promises.readFile(templatePath, 'utf-8');
  templateHtml = templateData;

  const componentItems = await fs.promises.readdir(componentsPath, { withFileTypes: true });
  const componentFiles = componentItems.filter((file) => file.isFile() && path.extname(file.name) === '.html');

  if (componentFiles.length === 0) {
    await fs.promises.writeFile(distHtmlPath, templateHtml);
  } else {
    for (const file of componentFiles) {
      const componentData = await fs.promises.readFile(path.join(componentsPath, file.name), 'utf-8');
      const componentName = path.parse(file.name).name;
      const regex = new RegExp(`{{${componentName}}}`, 'g');
      templateHtml = templateHtml.replace(regex, componentData);
    }
    
    await fs.promises.writeFile(distHtmlPath, templateHtml);
  }

  const styleItems = await fs.promises.readdir(stylesPath, { withFileTypes: true });
  const writeStream = fs.createWriteStream(distCssPath);

  for (const item of styleItems) {
    const itemPath = path.join(stylesPath, item.name);
    if (item.isFile() && path.extname(itemPath) === '.css') {
      const readStream = fs.createReadStream(itemPath, 'utf8');
      readStream.pipe(writeStream);
    }
  }

  await copyFiles(assetsPath, distAssetsPath);
}

async function copyFiles(sourceFolder, destinationFolder) {
  await fs.promises.rm(destinationFolder, { recursive: true, force: true });
  await fs.promises.mkdir(destinationFolder, { recursive: true });

  const files = await fs.promises.readdir(sourceFolder, { withFileTypes: true });

  for (const file of files) {
    const sourceFilePath = path.join(sourceFolder, file.name);
    const destinationFilePath = path.join(destinationFolder, file.name);

    if (file.isFile()) {
      await fs.promises.copyFile(sourceFilePath, destinationFilePath);
    } else if (file.isDirectory()) {
      await fs.promises.mkdir(destinationFilePath, { recursive: true });
      await copyFiles(sourceFilePath, destinationFilePath);
    }
  }
}

buildProject();
