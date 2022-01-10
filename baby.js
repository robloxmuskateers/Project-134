img = "";
status = "";
objects = [];
person_detected = 0;

function preload() {
    img = loadImage('baby.jpg');
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() {
    image(img, 0, 0, 640, 420);
    if(status != "") {
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("person_detected").innerHTML = "People Detected: " + objects.length;
            person_detected = objects.length;
            fill("#e31c1e");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 230, objects[i].y + 100);
            noFill();
            stroke("#e31c1e");
            rect(objects[i].x + 230, objects[i].y + 100, objects[i].width + 100, objects[i].height + 100);
        }
        if(person_detected == 0) {
            document.getElementById("person_detected").innerHTML = "PERSON MISSING";
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}