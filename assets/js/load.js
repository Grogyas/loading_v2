function LoadInit() {
  var count = 0;
  var thisCount = 0;
  
  
  const handlers = {
      startInitFunctionOrder(data) {
          count = data.count;
      },
  
      initFunctionInvoking(data) {
          $('.InLoad').css('left', '0%')
          $('.InLoad').css('width', `${((data.idx / count) * 100)}%`);
          $(".loadpercentage").replaceWith(`<p class="loadpercentage BarText">${Math.floor(((data.idx / count) * 100))}%</p>`);
      },
  
      startDataFileEntries(data) {
          count = data.count;
      },
  
      performMapLoadFunction(data) {
          ++thisCount;
          $('.InLoad').css('left', '0%')
          $('.InLoad').css('width', `${((data.idx / count) * 100)}%`);
          $(".loadpercentage").replaceWith(`<p class="loadpercentage BarText">${Math.floor(((data.idx / count) * 100))}%</p>`);
      },
  };
  
  window.addEventListener('message', function (e) {
      (handlers[e.data.eventName] || function () { })(e.data);
  });  
} 

LoadInit()