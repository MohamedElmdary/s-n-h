const express = require('express');
const app = express();
const axios = require('axios');

async function getData(data, stopAt = void 0, site = 1) {
  const html = (await axios.post('https://schoolynetwork.com/ar', {
    sptpl: 'section.ajax',
    tmpl: 'component',
    format: 'raw',
    xmlc: 1,
    site
  })).data;
  if (!html) {
    return;
  }
  data[site.toString()] = html;
  if (stopAt && site >= stopAt) {
    return;
  }
  console.log(html.length);
  return getData(data, stopAt, ++site);
}

app.get('*', async (_, res) => {
  const data = {};
  try {
    await getData(data, 5);
  } catch {}
  res.json(data);
});

app.listen(8080, () => console.log('server started!'));
