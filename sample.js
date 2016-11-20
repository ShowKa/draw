var gm = require('gm')

// image size ang bg color
var pic = gm(500, 500, "white")

// rectangle 1
pic.fill('white')
pic.stroke("#6C68FF", 1)
pic.drawRectangle(30, 40, 200, 400)

// rectangle 2
pic.fill('white')
pic.stroke("#FF6C68", 1)
pic.drawRectangle(240, 40, 400, 400)

// save
pic.write('picture/t.png', function(err) {
    if (err) throw err;
});
