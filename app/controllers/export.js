const fs = require('fs');
const HttpStatus = require('http-status-codes');
const path = require('path');
const pify = require('pify');
const { tmpdir } = require('os');

const TMPDIR = tmpdir();
const readFile = pify(fs.readFile);
const unlink = pify(fs.unlink);

module.exports = {
  * get() {
    const filename = this.query.f;
    const tmpfile = path.join(TMPDIR, this.params.id);

    try {
      this.attachment(filename);
      this.body = yield readFile(tmpfile);

      yield unlink(tmpfile);
    } catch (err) {
      this.log.error(err);
      this.throw(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  },
};
