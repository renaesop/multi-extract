/**
 * Created by fed on 2017/9/27.
 */
const util = require('loader-utils');
const os = require('os');
const fs = require('fs');
const path = require('path');
const dir = path.join(os.tmpdir(), 'multi-extract');
const mkdirp = require('mkdirp').sync;

mkdirp(dir);

module.exports = function (request) {
  const { theme } = util.getOptions(this) || {};
  const result = request.replace(/@import\s+\S+theme.scss\S+\s+/, '');
  const pathList = [];
  theme.forEach((themeAddr, index) => {
    const item = `@import "${themeAddr}";\n` + result;
    const name = util.interpolateName(this, `[name].scss-${index}`, {});
    console.log(name)
    const scssPath = path.join(dir, name);
    fs.writeFileSync(scssPath, item);
    pathList.push(`import "${scssPath}";`)
  });
  return pathList.join('\n');
};
