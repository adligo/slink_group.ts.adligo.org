const runWith = require('./runFunsNew.cjs');
const projects = require('./projects.cjs');
const fs = require("fs");
const getOpts = require('./getOpts.cjs');
/**
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
var base =  'https://github.com/';
var args = [];
var pull = false;

if (process.argv != undefined) {
	args = process.argv;
}
console.log('Base is ' + base + ' checking cli arguments; \n' + args);
for (var i=0; i < args.length; i++) {
  let arg = args[i];
  console.log('With argument ' + arg);
  switch (arg) {
    case '--ssh': base = 'git@github.com:'; break;
    case '--pull': pull = true; break;
  }
}

for (var i=0; i < projects.length; i++) {
  let project = projects[i];
  if (fs.existsSync(project.getName())) {
    if (pull) {
      runWith('git',['pull'], getOpts(project.getName()));
    } else {
      console.log(project.getName() + ' appears to already have been cloned');
    }
  } else {
    runWith('git',['clone',base + 'adligo/' + project.getName() + '.git']);
  }
}