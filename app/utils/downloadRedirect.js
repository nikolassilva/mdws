const fs = require('fs');
const pify = require('pify');
const R = require('ramda');
const tempfile = require('tempfile');
const url = require('url');
const { basename } = require('path');

const writeFile = pify(fs.writeFile);

/**
 * TODO
 */
const downloadRedirect = R.curry((ctx, data) => {
  const tmp = tempfile();
  return writeFile(tmp, data.buffer).then(() => {
    const location = url.format({
      protocol: ctx.protocol,
      host: ctx.host,
      pathname: `/api/v1/download/${basename(tmp)}`,
      query: { f: data.filename },
    });

    ctx.redirect(location);
    ctx.body = { location };
  });
});

/** @module downloadRedirect */
module.exports = downloadRedirect;
