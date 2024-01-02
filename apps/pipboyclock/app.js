// Clock to mimic the Fallout 4 Pip-Boy
const bigFont = 4;
const smallFont = 2;
const tinyFont = 1;
const green = "#00ff00";
const darkGreen = "#009900";
const darkestGreen = "#004c00";
const white = "#FFFFFF";
const black = "#000000";

{ // must be inside our own scope here so that when we are unloaded everything disappears
  // we also define functions using 'let fn = function() {..}' for the same reason. function decls are global
let drawTimeout;

// Actually draw the watch face
let draw = function() {
  var x = g.getWidth();
  var y = g.getHeight();
  g.reset().clearRect(Bangle.appRect); // clear whole background (w/o widgets)
  g.setColor(black).fillRect(0, 0, x, y);
  var date = new Date();
  var timeStr = require("locale").time(date, 1); // Hour and minute
  
  // Draw line at top (tabs)
  require("Font8x16").add(Graphics);
  g.setColor(green);
  g.drawLine(0,35, 0, 32);
  g.drawLine(0, 32, 10, 32);
  g.drawLine(10, 32, 10, 27);
  g.drawLine(10, 27, 15, 27);
  g.drawLine(33, 27, 38, 27);
  g.drawLine(38, 27, 38, 32);
  g.drawLine(38, 32, x-1, 32);
  g.drawLine(x-1, 32, x-1, 35);
  
  // Draw tabs at top
  g.setFont("4x6",1);
  g.drawString("STAT",17,25);
  g.drawString("INV",50,25);
  g.drawString("DATA",80,25);
  g.drawString("MAP",110,25);
  g.drawString("RADIO",140,25);
  g.drawString("STATUS",13,35);
  g.setColor(darkGreen).drawString("SPECIAL",43,35);
  g.setColor(darkestGreen).drawString("PERKS",76,35);
  
  // Draw boxes at bottom (hp, level, ap)
  g.setColor(green).fillRect(0, y-10, x/4, y); // HP bar
  g.setColor(white).setFontAlign(-1, 0).setFont("4x6", 1).drawString("HP 90/90", 1, y-5);
  g.setColor(green).fillRect((x/4)+5, y-10, ((x/4)*3)-5, y); // Level bar
  g.setColor(white).setFontAlign(-1, 0).setFont("4x6", 1).drawString("Level 1", (x/4)+7, y-5);
  g.setColor(green).fillRect(x-(x/4), y-10, x, y); // AP bar
  g.setColor(white).setFontAlign(1, 0).setFont("4x6", 1).drawString("AP 70/70", x-1, y-5);

  // Draw boy image
  //g.setColor(g.theme.);
  g.drawImage({
  width : 82, height : 122, bpp : 3,
  transparent : 0,
  buffer : require("heatshrink").decompress(atob("ACUkwAdbgmSoAebyEBkhZayQDByVIDasQDoOCLIcgDqkCoEESouQDylJkAXGLikBOgIjDQAbRUAQWQhL1DiSYVOgNJkgaDhIeTWYIaEbQNIUIx6NkC5BA4eSIIMCHiQ1CBI2ALieQpEgeQpiBXKUCpK5CeQhiBfwx6MGQpBBLIKDFepytHBAJ6TiS5BBAuSoB6SOII1BhAjBKwVJXIJ6SWAR3CAQUkwQUKepA+DeQR6BfxCtCYRAICBYuSLgIyKeo4IBO4YACpKYIJoJcIZYQ1FhEkTBCMBghHJAQYUFZZEAiB6KBYIsEI4S2HOIR6ISoZHGPQwpJhMEHwSzFZZBNBFJMShLjBcwJ6MfwIpJhMgNYMkRIWSCgIAHCIILIBAJZBHYcCCJBNCLhIpBAQYmDWw4aBpMgNBApCwDULHAmQBxDgFTYgAFFgdIggFDC4ZZEGQOSEwqDCOIkCdIjsHbQyYEggpCwCeBWAQCEGQlACgYAEBAIUBTAKPBEAmAGoI+DWwMSBwIeFiACBiQpByRLGghlBFIRrBCI4ICR4UShAeGFgJEBO4TICEYJ6ER4lIWApWEHwK/EgikEPQRBBAQLXGYQLXFFIpcDVoT1BbojXIggsEEY5lBiApEAAbODKwplBAYRlDgGCoIPEgICEGoIdFSowmChDjFggCFDoxiEPQdBkBrFC4TXBPoryHcwQgBCgRWBBAIOCAQIUENYp3DHwYUCAoOANYR6COIjFKEAlJFISACAQoAHZxAsHAQSGELhIAIOgQCDcApcKAAx0CAQUIC5SkIa4gCBJoJQFRIZcPO4kEPQkEySVDBYp6KAoMSBYkShLmBAoMQPRx3CZYtIHAh6XXIKbDF4R6VkjdDFgR6WyCYQPRcCoKeELZh6KhALCJoYALyR6IEYKYRgVJJoZQEgmCEYgeMgMkR4Z6EySDCTBwyCpJ6FkmSBATmEABZWFDQIdBoMkHASYOaIwdBTwWSDQQOEPRSJJiVBBYK2NRJg4BPop6QI48JPoZ6RI459BDpz1BI5cQPR7mKI4LUBFhIAFaIJHKPoIsJAAqMBdgYIEDQWCLZ8kHwIgBAQmCUgSnJPRIdEagJcBAoIdPRgLXJO55xDFKh6JFKj1SLgOADqBQLiR6cLiZ6KBZh6LeQIAEiAdQiR6ETw1IDyARFTwsBIgwAJCIoXHcZTpLd4zjLdJeSC4rXRPQkCpJKLPSEJC4xKFPSEkOgzXQF4gjBOgzXQF4gjBLgzXPPQojBOgrXQggjGLgrXQiAjGEwgFGABJNFOIRcFa55NEEYcIa6kkEY4IEU4oAKZAgUDKwrdFPRwUDKwjXPPQpBHa6BxEHAhlEBwh6OR4rgHPSEEPQYjKPRyzEEZR6TI5J6UI5J6TAoJHIABNJHAUkVoo4Dep1JgGSpMkyStFhIpBhL1NDoIABCgQMFggpCiDUQyTLHiRoCPRkkSQJZBGQINGhBKEABR3JFggDCepiJByQNKXIUCXBqnNkkSepwAMXIQdacwsAA"))
}, 95, 40);
  
  // Draw date and time
  g.setColor(white)
  g.setFontAlign(-1, -1);
  g.setFont("8x16", 3);
  g.drawString(timeStr, 0, 40);
  // Get width & height of time string, then print line under it
  let timeWidth = g.stringMetrics(timeStr).width;
  let timeHeight = g.stringMetrics(timeStr).height;
  g.setColor(green);
  g.fillRect(0, timeHeight+30, timeWidth-10, timeHeight+35);
  
  var dateStr = (date.getMonth()+1)+"."+date.getDate()+"."+date.getFullYear();
  g.setColor(white);
  g.setFont("8x16", 1);
  g.drawString(dateStr, 10, 90);
  // Get width & height of time string, then print line under it
  let dateWidth = g.stringMetrics(dateStr).width;
  let dateHeight = g.stringMetrics(dateStr).height;
  g.setColor(green).fillRect(10, dateHeight+90, dateWidth+10, dateHeight+95);

  // queue next draw
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = setTimeout(function() {
    drawTimeout = undefined;
    draw();
  }, 60000 - (Date.now() % 60000));
};

// Show launcher when middle button pressed
Bangle.setUI({
  mode : "clock",
  remove : function() {
    // Called to unload all of the clock app
    if (drawTimeout) clearTimeout(drawTimeout);
    drawTimeout = undefined;
  }});

// Load widgets
Bangle.loadWidgets();
draw();
setTimeout(Bangle.drawWidgets,0);
}