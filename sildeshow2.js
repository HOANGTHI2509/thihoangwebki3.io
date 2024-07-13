var imageno1 =1;
displayimg(imageno1);

function nextimg(n){
    displayimg(imageno1 += n)
}

function currentSlide(n){
    displayimg(imageno1 = n)
}

function displayimg(n){
    var i;
    var image1 = document.getElementsByClassName("image1");
    var dots1 = document.getElementsByClassName("dot1");

    if(n > image1.length){
        imageno1 = 1;
    }

    if(n < 1){
        imageno1 = image1.length;
    }

    for(i=0; i < image1.length; i++){
        image1[i].style.display = "none";
    }

    for(i=0; i < dots1.length; i++){
        dots1[i].className = dots1[i].className.replace(" active", "");
    }

    image1[imageno - 1].style.display ="block";
    dots1[imageno - 1].className += " active";

}