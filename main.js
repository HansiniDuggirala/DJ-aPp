song= "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;


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
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        righttWristX = results[0].pose.righttWrist.x;
        righttWristY = results[0].pose.rightWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY" + leftWristY);
        console.log("rightWristX = " + rightWristX + "rightWristY" + rightWristY);

    }