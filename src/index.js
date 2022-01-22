const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const ejs = require('ejs');

function req(url, method, params, data, cookies) {
  return new Promise((resolve, reject) => {
    superagent(method, url)
      .query(params)
      .send(data)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .end(function (err, response) {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
  });
}

async function getOne() {
  try {
    let res = await req('http://wufazhuce.com/', 'GET');
    let $ = cheerio.load(res.text);
    let todayOneList = $('#carousel-one .carousel-inner .item');
    let todayOne = $(todayOneList[0])
      .find('.fp-one-cita')
      .text()
      .replace(/(^\s*)|(\s*$)/g, '');
    return todayOne;
  } catch (err) {
    console.log('错误', err);
    return err;
  }
}

module.exports = getOne;
