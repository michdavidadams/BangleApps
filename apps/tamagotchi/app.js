// Public Pixel font
Graphics.prototype.setFontPublicPixelz84yD = function() {
  // Actual height 18 (19 - 2)
  return this.setFontCustom(
    E.toString(require('heatshrink').decompress(atob('AG0P+EA/4ECgf/88//1zAgwTGGK0+nED8eAAgX8gE/4AECCZM//ATEFhkOgPA8Ecn//+f//4EJCaHwBwITEGIkB4PAjkch/x4H/AgfnDANx4Y2HuIODv4EB/gEC8Hgh0OgAEBMYsAuHgg8/4PzzkfnPBJQIdBh4iB/EAv0Ag/ggJABj5FBLwP8aIPOuZeBn0B4fgjAxFUoPj/iBHzkHnPAegOHXoIECh0+uHj84dBf4rhFJQIAPfwv/d4L+IADEB/0Aj6GBAgP//CGBwZtBQIPz8EfnEAueAg4EGuAxQDpazBj4xEHYOAIAeAJQgAQXoMDzgEDVogEBhwRB8AJFAgQYDSyQjEAg0f/8B//wAgITMADED88An1wfQJfFADpPMAiYAYj8AgPwAg4AYDokPAgP4AgOAgZPBnwNB8ASFwASCn4SFABkP/+A//4n//+f//4ECwE/nEDAgcAueAg4nBufgg4YG+AiBE4g2JEQgEHHYgEINwMHD4NwAhDzDgfw8E/n0P+fg/4ECw/nnF+uYECuAEBg85+Fzz5jBAgP8AgPAuBtBfoIECGIsB4Hgjk+gIxBj4ECE4IsEAhJoH/H8h+P4H4So1+NgLqB/zvDAgP48EPx0DAgM+PAPg8E4AgOAPoKfKAgQwEn/B4f8jgEB+f8j4ECziLB4FzAhgnBz//AgWH/k4v/DwZjFh//wH//BFHSqE+v/z87gBv7qB/EOh5xBGIs+gFzaILHHwH4nEPwZKBnE+geD8D5BgefQIIEB/gEB4CkBE4QECMYuPEwJjZfJH4E4gxFwPA/DHB+IYBY4IEBGLH//i9B4C9BMgoALj8fgPx+AEGDqIATj8cFgPAGMsOAQLXBAgLmEj//gKGBAgXzAgM/HYUcg8B4FwGKNzwC3BAjYwQIoRKEKgRZCMYptCOQYsBPgaPQnyPBAgmH884v1zAg9wBwIwB+EDHQXwgH4gEPHQIEBAAkP/+A//4n//+f//4ECQQmf885/wECnEORgPnn4JB/4ECuA2Bh42BAgKQFQIcHAgIxBHYPz8Hgn0ONoPgFgMDwAJFIoIYEVJAADLw4EEw5jBuCQBAhQYG+H4/EPx+AAgKVG4H//iVMAhc+gJ3Bj4EB+HgjkOgPA8EYMaIsQSoZeBdQMf8EB/0AAgKViAgRFLGKUAEQMDAh2AAgMAAg7HGwB3BSphjMv5FB/4EJMaHwOwVwgAELQJgEBMgoADVJIECERZ3HY5aWBTwP4AgPwgBABAgQTCdRg7IXAWDAgKVWj/ggP+AgUPx+A/AnBx/z8Efn0BNA4xRYZgEUGJ6eCUYKeBgI6Bj6tFfKYxYgE+gED8AxTh//wDWDCYr0LfJfwEQInEMaHzw8AnFwgYELn/wgZYBAgKfCUghjX884hwEDh4OBJQgdCBAPnh/+uAEBMa/gnF+Agd/4eH/gYDn8/+bgBg5jBuAEBMYuB4H4jk/+IYBj4ECw5jBuFzAhc+v/z8//AgPw8H8h0P4HgSwwADRYMDUwIEHORKpFDpSVG4f/PggdCcIJ3CuAELHZAiCE4QxF/BUBwE//wEB8AEBBoJ3BV4MA/8AgI7Bj4JDegWDDAYiDE4RjHQJPwgfggE+FYPgGAgJCBwKfMAgIxEn0B+fgegPP+f8CYPP+H//EPJoIEBgJtBGwIJEE4QYDEQQnEfJM/4EDUYIECIgM/M4JKCv/wg4EFLIYTDDojGFgE4HYOAj84h4EB/4ECw4EBv/zz//nP+uef84nBuf/fIIEB/gEB4Fz8EHUYIECMZSuNnAdBwEHAhdwFRIAGcgYECgH4gEPwEAQwL5JJYIPBCggPBCgoAHKiAECO5YsBABQ='))),
    32,
    20,
    20|65536
  );
};

{ // must be inside our own scope here so that when we are unloaded everything disappears
  // we also define functions using 'let fn = function() {..}' for the same reason. function decls are global
let drawTimeout;

// Actually draw the watch face
let draw = function() {
  let x = g.getWidth();
  let y = g.getHeight();
  g.reset().clearRect(Bangle.appRect); // clear whole background (w/o widgets)
  
  // Draw egg shell
  g.setColor(0, 0, 1);
  g.fillRect(0, 0, x, y); // inner shell
  // Draw egg cracks
  g.setColor(0, 0, 0);
  // Top
  g.fillPoly([
    0,25,
    x*0.1,34,
    x*0.2,25,
    x*0.4,35,
    x*0.5,25,
    x*0.6,33,
    x*0.8,25,
    x*0.9,30,
    x,25
  ]);
  // Right
  g.fillPoly([
    x,0,
    x-9,y*0.1,
    x,y*0.2,
    x-6,y*0.4,
    x,y*0.6,
    x-8,y*0.8,
    x,y
  ]);
  // Bottom
  g.fillPoly([
    0,y,
    x*0.1,y-9,
    x*0.2,y,
    x*0.4,y-7,
    x*0.5,y,
    x*0.6,y-8,
    x*0.8,y,
    x*0.9,y-4,
    x,y
  ]);
  // Left
  g.fillPoly([
    0,0,
    9,y*0.1,
    0,y*0.2,
    6,y*0.4,
    0,y*0.5,
    8,y*0.6,
    0,y*0.7,
    9,y*0.8,
    0,y
   ]);
  g.fillRect(0, 0, x, 25); // Top black bar of egg cracks
  
  // Activities bars
  g.setColor(1, 1, 0);
  g.fillRect(10, 40, x-10, y-10);
  
  // Main background, clear looks better but the original had pink and cyan patterned background
  g.setColor(1, 1, 1);
  g.fillRect(10, 60, x-10, y-30);
  
  // Draw time and date
  var date = new Date();
  

  // Draw tama
  g.setColor(0, 0, 0);
  g.drawImage({
  width : 70, height : 81, bpp : 3,
  transparent : 1,
  buffer : require("heatshrink").decompress(atob("kmSpMkwAHChIIDAQgVDiQLGkALCgQLGAQNABoUEBY1IEwYyHkmQBgUBEw5WHAQoNDBY5oXHwY1KBowpDQAYADLgp0EKAwLLOgxQHBZZ0FAAa5DBZZcNNEQANNBYANNBYANNBYAOND7LFARZiBNArLFARZiBNArLFARZiCApACONH8kNwxcBgRoPNw4HBNB9ANwxcBNB+QNwxcBhJohdKRWGdKZWFdKZWFAALpRX4xojBYZcJNBYLDLhJoLBYZcKBZxcONGMCCIS5ROgQFIdKBKDKBLpLKwYFFARpiFNDAXFDpZEBMQqAFAoMJDRALDMQdAQAgFBX4IaHBYZiDyCAEAoMAJpALDNBZcCDQ4LDNBabJNA6MDQBZoDAAbRFAAKAJNAgADa4qAKNAgADWYYHDJpRoCAAZoTIghoGXIgCMaIgFGARxoHAoYCNaI4FDARpiFNDJQEDRp6JKAIyNoB6IKALRLAQOQPRBWBgRoNPRJozBYZQBNwIADMQILDOhZQBYoQACMQILDOhZQCDIhiCBYZ0LXIJuBAAZiBBYZ0LNDoRDbqJoEbqpoDbqpoDPQYFFNEmAcYJiGHwJoNCIbLBCJpQJZYIaWgBQCDSpmBGSxoSoAA="))
}, (x/4)+10, (y/4)+20);

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
g.clear();
draw();
setTimeout(Bangle.drawWidgets,0);
}
