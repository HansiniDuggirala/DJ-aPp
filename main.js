song= "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;


function preload()
{
    song=loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();  
    poseNet=ml5.poseNet(video, modelLoaded);
}

function draw()
{
image(video, 0, 0, 600, 500);
 fill("#30D5C8");
 stroke ("#30D5C8");
if (scoreRightWrist > 0.2)
{

    circle(rightWristX,rightWristY,20);
    if(rightWristY >0 && rightWristY<= 100)
    {
        document.getElementById("speed").innerHTML = "speed = 0.5x" 
        song.rate(0.5);
    }
   else if(rightWristY >100 && rightWristY<= 200)
   {
       document.getElementById("speed").innerHTML = "speed = 1x" 
       song.rate(1);
   }
   else if(rightWristY >200 && rightWristY<= 300)
   {
       document.getElementById("speed").innerHTML = "speed = 1.5x" 
       song.rate(1.5);
   }
   else if(rightWristY >300 && rightWristY<= 400)
   {
       document.getElementById("speed").innerHTML = "speed = 2x" 
       song.rate(2);
   }
   else if(rightWristY >400 && rightWristY<= 500)
   {
       document.getElementById("speed").innerHTML = "speed = 2.5x" 
       song.rate(2.5);
   }

}

 if(scoreLeftWrist > 0.2)
 {
     circle(leftWristX,rightWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor( InNumberleftWristY);
    leftWristY_divide_1000 = remove_decimals/1000
    volume = leftWristY_divide_1000 *2;
    document.getElementsByID("volume").innerHTML = "volume = " + volume;
    song.SetVolume(volume);
}
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded ()
    {
        console.log('Model Is Intitialized');
        poseNet.on('pose', gotPoses);
    }

    function gotPoses(results)
    {
        if (results.length > 0 );
        console.log (results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist +"scoreRightWrist = " + scoreRightWrist );
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        righttWristX = results[0].pose.righttWrist.x;
        righttWristY = results[0].pose.rightWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY" + leftWristY);
        console.log("rightWristX = " + rightWristX + "rightWristY" + rightWristY);

    }