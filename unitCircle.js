var w = window.innerWidth
var h = window.innerHeight
let font

function preload() {
    font = loadFont('ref/font/SimSun.ttf')
}

function setup() {
    var canvas = createCanvas(w / 2, h)
    canvas.parent('canvas')
}

//Variables: Var
var spc = w / 35
var strokeW_dflt = 1
var d = w / 2 - 2 * spc
var r = d / 2
var ngspc = 10
var gspc = d / ngspc
var v = {
    x: 1,
    y: 0,
    o: null
}

function draw() {
    update()

    stroke(255)
    strokeWeight(strokeW_dflt * 2)
    line(w / 2, spc / 2, w / 2, h - spc / 2)

    drawGrid()

    pntCoord()

    x = v.x * r
    y = v.y * r

    translate(spc + r, spc + r)
    stroke(255)
    strokeWeight(strokeW_dflt * 2)
    fill('#CCBEF3')
    if (v.o != 90) {
        arc(0, 0, r / 10, r / 10, -(v.o / 180) * PI, 0)
        if (v.o == 360) {
            circle(0, 0, r / 20)
        }
    } else {
        stroke(255)
        strokeWeight(strokeW_dflt * 2)
        rect(0, 0, r / 20, -r / 20)
        strokeWeight(strokeW_dflt * 5)
        point(r / 40, -r/40)
    }

    drawUpperGrid()

    strokeWeight(strokeW_dflt * 2)
    stroke('#EEB8F2')
    line(x, y, x, 0)
    line(x, y, 0, y)
    stroke('#B3FF7E')
    line(x, y, 0, 0)

    stroke('#F5CC8A')
    noFill()
    strokeWeight(strokeW_dflt * 3)
    circle(0, 0, r)

    stroke('#6ECDFF')
    strokeWeight(strokeW_dflt * 15)
    point(x, y)
    translate(-(spc + r), -(spc + r))
}

function update() {
    canvasUpdate()
    verifyFocus()
    varsUpdate()
}

function canvasUpdate() {
    resizeCanvas(w / 2, h, true)
    w = window.innerWidth
    h = window.innerHeight
    spc = w / 35
    d = w / 2 - 2 * spc
    r = d / 2
    gspc = d / ngspc

    background(0)
}

function verifyFocus() { }

function varsUpdate() {
    v.o = document.getElementById('sldo').value

    document.getElementById('shwx').innerHTML = +(v.x).toFixed(15)
    document.getElementById('shwy').innerHTML = -(v.y).toFixed(15)
    document.getElementById('shwo').innerHTML = v.o + "° (" + (v.o / 180).toFixed(2) + "𝜋 rad)"
}

function pntCoord() {
    v.x = Math.cos(-(v.o / 180) * PI)
    v.y = Math.sin(-(v.o / 180) * PI)
}

function drawGrid() {
    stroke(80)
    strokeWeight(strokeW_dflt)
    for (i = 0; i <= Math.round(ngspc / 2); i++) {
        line(spc + r + gspc * i, spc, spc + r + gspc * i, spc + d)
        line(spc + r - gspc * i, spc, spc + r - gspc * i, spc + d)
        line(spc, spc + r + gspc * i, spc + d, spc + r + gspc * i)
        line(spc, spc + r - gspc * i, spc + d, spc + r - gspc * i)
    }
}

function drawUpperGrid() {
    stroke(255)
    strokeWeight(strokeW_dflt * 2)
    translate(-d / 2, -spc - d / 2)
    for (i = 0; i < 3; i++) {
        line(r * i, spc, r * i, spc + d)
    }
    translate(-spc, spc)
    for (i = 0; i < 3; i++) {
        line(spc, r * i, spc + d, r * i)
    }
    translate(spc + d / 2, d / 2)
}