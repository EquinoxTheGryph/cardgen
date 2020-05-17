// to easily add options, add '''  name="NAMEHERE"  ''' to input and a corresponding id to the output node: '''  id="NAMEHERE"  '''

var json = { // type (0 = text, 1 = src, 2 = option, 3 = other)
    "cid" :         [0, 1], 
    "fname" :       [0, ""], 
    "sname" :       [0, ""], 
    "species" :     [0, ""], 
    "gender" :      [2, ""], 
    "ownername" :   [0, ""],
    "element" :     [2, ""],
    "suit" :        [2, ""], 
    "stance" :      [2, ""], 
    "dice" :        [0, 0], 
    "image" :       [1, ""],
    "artistname" :  [0, ""],
}

var image_transform = [0, 0, 1] // [xpos, ypos, scale]  pos 0 = middle, unit "em"

function applytransform() {
    var xpos = document.getElementsByName("xpos")[0].value
    var ypos = document.getElementsByName("ypos")[0].value
    var scale = document.getElementsByName("scale")[0].value

    image_transform = [xpos, ypos, scale]

    document.getElementById("image").setAttribute("style", "transform: scale(" + scale + ") translate(" + xpos + "%, " + ypos + "% );")
}

function getset(_obj) {
    switch (json[_obj][0]) { // type (0 = text, 1 = src, 2 = option, 3 = other)
        case 0:
            var str = document.getElementsByName(_obj)[0].value
            if (str == "") {
                str = "---"
            }
            if (typeof str === 'string' || str instanceof String) {
                str = str.substring(0,1).toUpperCase() + str.substring(1).toLowerCase()
            }
            json[_obj][1] = str
            document.getElementById(_obj).innerText = json[_obj][1]
            break
        case 1:
            var src = document.getElementsByName(_obj)[0].value
            if (src == "") {
                src = "images/res/noimage.svg"
            }
            json[_obj][1] = src
            document.getElementById(_obj).setAttribute("src", json[_obj][1])
            break
        case 2:
            // only supports dynamic image replacements, not text.
            var option = document.getElementsByName(_obj)[0].value
            json[_obj][1] = option
            document.getElementById(_obj).setAttribute("src", "images/res/" + _obj + "/" + json[_obj][1] + ".svg")
            break
        default:
            break
    }
}


// EVENTS

function on_submit() {
    for (i in json) {
        getset(i)        
    }
    applytransform()
}

function on_translation_changed() {
    applytransform()
}

function on_load() {
    window.setTimeout(on_submit, 1) 
    // somehow needs a little timeout to load stuff
}
