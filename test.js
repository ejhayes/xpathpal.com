// testing out the sample xpath stuff for javascript...
var xml = "<book><title>Harry Potter</title></book>"
var doc = new dom().parseFromString(xml)
var title = xpath.select("//title/text()", doc).toString()
console.log(title)