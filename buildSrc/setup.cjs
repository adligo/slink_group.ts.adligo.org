const runWith = require('./runFunsNew.cjs');
const projects = require('./projects.cjs');
const getOpts = require('./getOpts.cjs');
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


for (var i = 0; i < projects.length; i++) {
  let project = projects[i];
  console.log('setup.cjs running slink on project ' + JSON.stringify(project));
  runWith('slink', [], getOpts(project.getName()));
}
