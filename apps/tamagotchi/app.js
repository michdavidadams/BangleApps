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
  
    // Main background
  g.setColor(1, 1, 1);
  g.fillRect(10, 60, x-10, y-30);

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
