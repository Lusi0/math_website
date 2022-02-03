
// function that takes a width and a height and returns the largest box that could be returned
function Boxfuction(side1, side2,x){
    if (side1 > side2){
        highside = side1;
        lowside = side2;
    }
    else{
        highside = side2;
        lowside = side1;
    }
    
    if (x< 0) {
        return NaN;
    }
    else if (x > highside){
        return NaN;
    }
    else{
        return (highside - (2*x))*(lowside - (2*x))*x;
    }
}


// function that takes a width and a height and returns the largest box that could be returned
function box_graph_points(side1, side2){

    mylist = [];

    if (side1 > side2){
        highside = side1;
        lowside = side2;
    }
    else{
        highside = side2;
        lowside = side1;
    }

    for (i = 0; i < (lowside/2); i+=0.0001){
        mylist.push([Boxfuction(highside, lowside, i), i]);
        
    }
    // find the max value in the list
    mymax = 0;
    for (i = 0; i < mylist.length; i++){
        if (mylist[i][0] > mylist[mymax][0]){
            mymax = i;
        }
    }
    return mylist[mymax];
}











let cam;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    cam = createCamera();
    cam.setPosition(0, 0, 500);
    normalMaterial();
    frameRate(100);
  }
  

framecount = -10;



function drawAndTranslate(x,y,z,tx,ty,tz){
    push();
    translate(tx,ty,tz);
    box(x,y,z);
    translate(-tx,-ty,-tz);
    pop();
    // reverse the translation
}

const thin = 0.1;

const default_size = 400;


width = 5
height = 10




let actual_width = 0;

actual_width = default_size * (width/height);

info = box_graph_points(400,actual_width);

let final_width = actual_width-info[1];

let final_height = default_size - info[1];


let final_length = info[1]


// fucntion named update_info

function update_info(width,height){
    // get element with id info
    // update the text to be the width and height
    myinfo = box_graph_points(width,height);
    document.getElementById("info").innerHTML = "area: " + Math.round(myinfo[0]*1000)/1000 + " width: " + Math.round(width*1000)/1000 + " height: " + Math.round(height*1000)/1000 + " length: " +  Math.round(myinfo[1]*1000)/1000;
}
update_info(width,height);

// every time input with id of "width" is changed, the function is called to update the variable width
document.getElementById("width").addEventListener("change", (event) => {
    console.log("width changed");
    width = parseFloat(document.getElementById("width").value);
    console.log(info, final_width, final_height);
    actual_width = default_size * (width/height);
    info = box_graph_points(400,actual_width);

    final_width = actual_width-info[1];

    final_height = default_size - info[1];

    final_length = info[1];
    console.log(info, final_width, final_height);
    update_info(width,height);
});
// every time input with id of "height" is changed, the function is called to update the variable height
document.getElementById("length").addEventListener("change", (event) => {
    console.log("length changed");
    console.log(info, final_width, final_height);
    height = parseFloat(document.getElementById("length").value);
    actual_width = default_size * (width/height);
    info = box_graph_points(400,actual_width);

    final_width = actual_width-info[1];

    final_height = default_size - info[1];

    final_length = info[1];
    console.log(info, final_width, final_height);
    update_info(width,height);
});




function draw(){
    background(255);
    // set the camera position should be changed to move in a circle using sin and cos
    
    xy = getXY(framecount, 1000);

    cam.setPosition(xy[0], xy[1], 500);
    // log to console current pos

    cam.lookAt(0, 0, 0);
    // make a box
    drawAndTranslate(final_length,thin,final_width,-final_length/2,final_height/2,0);
    drawAndTranslate(final_length,thin,final_width,-final_length/2,-final_height/2,0);


    drawAndTranslate(final_length,final_height,thin,-final_length/2,0,final_width/2);
    drawAndTranslate(final_length,final_height,thin,-final_length/2,0,-final_width/2);


    // BASE
    drawAndTranslate(thin,final_height,final_width,0,0,0);

    

    framecount+=0.01;
}

// javascript fuction that takes in frame count and radious and returns x and y on a circle
function getXY(framecount, radious){
    x = radious * cos(framecount);
    y = radious * sin(framecount);
    return [x,y];
}

