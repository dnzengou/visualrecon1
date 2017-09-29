var system = require('system');
var apiKey = system.env.API_KEY;
var baseHost = 'http://localhost:3000';

casper.start();

casper.thenBypassUnless(function() {
  return apiKey && apiKey.length > 0;
}, 4);

casper.thenOpen('http://localhost:3000', function(result) {
  casper.test.assert(result.status === 200, 'Front page opens');
  casper.test.assertSelectorHasText('a.wordmark', 'IBM Watson Developer Cloud');
  testHeaderLinks();
});

function testHeaderLinks() {
  checkLinkDest('http://localhost:3000', 'nav.heading-nav li:nth-child(1) a', /http:\/\/www.ibm.com\/watson\/developercloud\/services-catalog.html/);

  checkLinkDest('http://localhost:3000', 'nav.heading-nav li:nth-child(2) a', /http:\/\/www.ibm.com\/watson\/developercloud\/doc/);

  checkLinkDest('http://localhost:3000', 'nav.heading-nav li:nth-child(3) a', /http:\/\/www.ibm.com\/watson\/developercloud\/starter-kits.html/);

  checkLinkDest('http://localhost:3000', 'nav.heading-nav li:nth-child(4) a', /https:\/\/developer.ibm.com\/watson/);

  checkLinkDest(baseHost, 'div.banner--service-links li:nth-child(1) a', /https:\/\/www.ibm.com\/watson\/developercloud\/visual-recognition\/api\/v3\//);
  checkLinkDest(baseHost, 'div.banner--service-links li:nth-child(2) a', /http:\/\/www.ibm.com\/watson\/developercloud\/doc\/visual-recognition\//);
  checkLinkDest(baseHost, 'div.banner--service-links li:nth-child(3) a', /https:\/\/github.com\/watson-developer-cloud\/visual-recognition-nodejs/);
}

function checkLinkDest(starturl, selectorToClick, shouldBePattern) {
  casper.thenOpen(starturl, function() { });
  casper.then(function() { this.click(selectorToClick);  });
  casper.then(function() { casper.test.assertUrlMatch(shouldBePattern, 'location should match ' + shouldBePattern); });
}

casper.run(function() {
  this.test.done();
});
