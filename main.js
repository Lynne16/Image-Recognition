Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_img" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/S9VItLpwp/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function check(){
    img=document.getElementById("captured_img");
    classifier.classify(img , gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_object_name").innerHTML=results[0].label;
        per_result=(results[0].confidence.toFixed(3)) * 100;
        document.getElementById("result_objrct_accuracy").innerHTML=per_result + "%";
    }
}