
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
    cam.lookAt(0, 0, 0);
    normalMaterial();
    frameRate(100);
  }
  

framecount = 0;





mywidth = 100
myheight = 100
length = box_graph_points(mywidth, myheight)[1];



// fucntion named update_info

function update_info(mywidth,myheight){
    // get element with id info
    // update the text to be the mywidth and myheight
    myinfo = box_graph_points(mywidth,myheight);
    document.getElementById("info").innerHTML = "area: " + Math.round(myinfo[0]*1000)/1000 + " mywidth: " + Math.round(mywidth*1000)/1000 + " height: " + Math.round(myheight*1000)/1000 + " length: " +  Math.round(myinfo[1]*1000)/1000;
}
update_info(mywidth,myheight);

// every time input with id of "width" is changed, the function is called to update the variable width
document.getElementById("width").addEventListener("change", (event) => {
    mywidth = parseFloat(document.getElementById("width").value);
    // if mywidth is NaN, set it to 0
    if (isNaN(mywidth)){
        mywidth = 0;
    }
    // if mywidth is less than 0, set it to 0
    if (mywidth < 0){
        mywidth = 0;
    }
    update_info(mywidth,myheight);
    length = box_graph_points(mywidth, myheight)[1];
});
// every time input with id of "height" is changed, the function is called to update the variable height
document.getElementById("length").addEventListener("change", (event) => {
    
    myheight = parseFloat(document.getElementById("length").value);
    // if myheight is NaN, set it to 0
    if (isNaN(myheight)){
        myheight = 0;
    }
    // if myheight is less than 0, set it to 0
    if (myheight < 0){
        myheight = 0;
    }
    update_info(mywidth,myheight);
    length = box_graph_points(mywidth, myheight)[1];
});




function draw(){
    background(255);
    // set the camera position should be changed to move in a circle using sin and cos
    


    // log to console current pos

    
    // make a box
    rotateY(framecount*0.01);
    rotateX(framecount*0.02);
    box(mywidth, myheight, length);
    // rotate the box
    

    framecount+=1;
}

// javascript fuction that takes in frame count and radious and returns x and y on a circle

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }


