const [run1, run2, run3] = require('./runFuns.cjs');
const [Project, projects] = require('./projects.cjs');
/**
 * This must be run from the root (aka ..) directory.
 * 
 * 
  * Copyright 2025 Adligo Inc / Scott Morgan
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
//run('pwd',[], getOpts('log2.ts.adligo.org'})
function getOpts(dir) {
  var obj = {};
  if (dir != undefined) {
    obj = new Object();
    obj.cwd = dir;
  }
  if (process.env.USHELL != undefined) {
    console.log("USHELL is " + process.env.USHELL);
    obj.shell = process.env.USHELL
  }
  console.log('setup.cjs getOpts returning ' + JSON.stringify(obj));
  return obj;
}

for (var i = 0; i < projects.length; i++) {
  let project = projects[i];
  console.log('setup.cjs running slink on project ' + JSON.stringify(project));
  run3('slink', ['-r'], getOpts(project.getName()));
}

module.exports = [getOpts];