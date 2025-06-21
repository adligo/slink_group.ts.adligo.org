const fs = require('fs');
const path = require('path');
const projects = require('./projects.cjs');

/**
 * Collects JUnit XML files from all projects and copies them to depot/test-results
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

function createDir(dirPath) {
  const absolutePath = path.resolve(dirPath);
  if (!fs.existsSync(absolutePath)) {
    fs.mkdirSync(absolutePath, { recursive: true });
    console.log(`Created directory: ${absolutePath}`);
  }
}

function copyFile(source, destination) {
  try {
    fs.copyFileSync(source, destination);
    console.log(`Copied: ${source} -> ${destination}`);
    return true;
  } catch (error) {
    console.error(`Failed to copy ${source}: ${error.message}`);
    return false;
  }
}

function collectTestResults() {
  console.log('Collecting JUnit XML test results from all projects...');
  
  // Create the depot/test-results directory
  const depotDir = 'depot/test-results';
  createDir(depotDir);
  
  let totalFiles = 0;
  let copiedFiles = 0;
  
  // Iterate through all projects
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const projectName = project.getName();
    const testReportsDir = path.join(projectName, 'build', 'test-reports');
    
    console.log(`\nChecking project: ${projectName}`);
    
    // Check if the test-reports directory exists
    if (fs.existsSync(testReportsDir)) {
      console.log(`  Found test-reports directory: ${testReportsDir}`);
      
      // Find all XML files in the test-reports directory
      try {
        const files = fs.readdirSync(testReportsDir);
        const xmlFiles = files.filter(file => file.endsWith('.xml'));
        
        if (xmlFiles.length > 0) {
          console.log(`  Found ${xmlFiles.length} XML file(s)`);
          
          // Copy each XML file to the depot directory
          xmlFiles.forEach(xmlFile => {
            totalFiles++;
            const sourceFile = path.join(testReportsDir, xmlFile);
            // Prefix the filename with the project name to avoid conflicts
            const destinationFile = path.join(depotDir, `${projectName}_${xmlFile}`);
            
            if (copyFile(sourceFile, destinationFile)) {
              copiedFiles++;
            }
          });
        } else {
          console.log(`  No XML files found in ${testReportsDir}`);
        }
      } catch (error) {
        console.error(`  Error reading directory ${testReportsDir}: ${error.message}`);
      }
    } else {
      console.log(`  No test-reports directory found for ${projectName}`);
    }
  }
  
  console.log(`\nTest result collection complete:`);
  console.log(`  Total XML files found: ${totalFiles}`);
  console.log(`  Successfully copied: ${copiedFiles}`);
  console.log(`  Destination: ${path.resolve(depotDir)}`);
  
  if (copiedFiles === 0) {
    console.log('\nNote: No XML files were found. This could mean:');
    console.log('  1. Tests have not been run yet');
    console.log('  2. Tests are not generating XML output');
    console.log('  3. XML files are being generated in a different location');
    console.log('\nTry running "npm run tests" first, then run this script again.');
  }
}

// Run the collection
collectTestResults();