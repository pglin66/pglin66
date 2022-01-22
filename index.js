const fs = require('fs-extra');
const ejs = require('ejs');
const getOne = require('./src');

(async function () {
  const one = await getOne();
  const template = fs.readFileSync(`${__dirname}/src/template.md`);
  const time = new Date().toLocaleString();
  const html = ejs.render(template.toString(), { one, time });
  const filePath = `${__dirname}/README.md`;
  fs.ensureFileSync(filePath);
  fs.writeFileSync(filePath, html, { encoding: 'utf8' });
})();
