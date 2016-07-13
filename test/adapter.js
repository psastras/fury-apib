/*
 * Tests for API Blueprint serializer.
 */

import {expect} from 'chai';

import adapter from '../src/adapter';
import fs from 'fs';
import fury from 'fury';
import glob from 'glob';
import path from 'path';

const base = path.join(__dirname, 'fixtures');

describe('API Blueprint serializer adapter', () => {
  const files = glob.sync(path.join(base, '*.json'));

  fury.use(require('fury-adapter-swagger'));


  files.forEach((file) => {
    const apib = file.substr(0, file.length - 4) + 'apib';

    it(`serializes ${path.basename(file)}`, (done) => {
      var swagger = fs.readFileSync('test.yml', 'utf-8');
      fury.parse({ source: swagger }, function (parseErr, res) {
        if (parseErr) {
          return done(parseErr);
        }
        adapter.serialize({ api: res.api }, (serializeErr, serialized) => {
          if (serializeErr) { return done(serializeErr); }
          // expect(expectedBlueprint.trim()).to.deep.equal(serialized.trim());
          done();
        });
      });

    });
  });
});
