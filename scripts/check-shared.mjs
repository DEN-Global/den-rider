import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const root=new URL('../vendor/den-shared/',import.meta.url);
const manifest=JSON.parse(await readFile(new URL('PROVENANCE.json',root),'utf8'));
assert.equal(manifest.source,'DEN-Global/den-shared');
for(const [file,expected] of Object.entries(manifest.files)){assert.ok(!file.includes('..'));const actual=createHash('sha256').update(await readFile(new URL(file,root))).digest('hex');assert.equal(actual,expected,'Shared snapshot drift: '+file);}
const actual=await readdir(new URL('src/',root));assert.equal(actual.length,Object.keys(manifest.files).filter(f=>f.startsWith('src/')).length,'Untracked source in shared snapshot');
console.log('Verified shared snapshot '+manifest.version+' ('+Object.keys(manifest.files).length+' files).');
