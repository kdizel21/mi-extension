var miScraper =  function() {
  //useful calls
  //chrome.history.getVisits(object details, function callback)
  //chrome.history.search(object query, function callback)
  this.init = function(tab) {
    this.doc = document;
    this.tab = tab;
    var reg = new RegExp(tab.url);
    if(reg.test('facebook.com')) {
      this.fb();
    } else {
      //logic for grabbing largest/most important div
      //http://api.jquery.com/contents/
      this.getText('#contents1');
    }
  };
  this.fb = function() {
//    $('#example-0').contents().filter(function() {
//        return (this.nodeType == 3) && this.nodeValue.match(/\S/);
//    })
  }

  this.getText = function(container) {
    var textArr = [],
        textHash = {},
        content,key;
    $(container).contents().filter(function() {
      var childCount;
      var drilldown = function(elem) {
        $.each(elem, function(i,obj) {
          //for cases when elem.length is 1
          obj = obj || elem;
          if(obj.nodeType == 3) {
            drilldown($(obj).children());
          } else if(this.nodeType === 1 && this.textContent !== "\n") {
            content = this.textContent//.replace(/\n/g,'');
            key = $(this).prevAll(':header').first();
            key = key.length > 0 ? key.text() : 'no_header';
            textHash[key] = content;
            textArr.push(textHash);
            textHash = {};
          }
        });
      };
      drilldown(this);
    });
    console.log(textArr)
  }
}

chrome.browserAction.onClicked.addListener(function(tab) {
  var scraper = new miScraper();
  scraper.init(tab)
});
