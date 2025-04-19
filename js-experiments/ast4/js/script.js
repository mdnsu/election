var imageWrapper = document.getElementsByClassName('image-wrapper')[0];
var slideCount = 0;

function changeSlides(direction) {
    if (direction == 1) {
        if (slideCount < 4) {
            slideCount += 1;
            console.log('Positive ' + slideCount);
            showSlides(slideCount, direction);
        }
    }

    if (direction == -1) {
        if (slideCount > 0) {
            slideCount -= 1;

            console.log('Negative ' + slideCount);
            showSlides(slideCount, direction);
        }
    }
}


function showSlides(slideCount, direction) {
    var delta = 0;
    var referencePosition;
    if (direction == 1) {
        var myInterval = setInterval(function() {
            referencePosition = slideCount - 1;
            referencePosition = referencePosition * 1000;
            if (delta <= 1000) {
                imageWrapper.style.marginLeft = (-delta - referencePosition) + 'px';
                delta += 50;
            } else {
                clearInterval(myInterval);
            }
        }, 20);
    }
    if (direction == -1) {
        var myInterval = setInterval(function() {
            referencePosition = (slideCount + 1) * 1000;
            if (delta <= 1000) {
                imageWrapper.style.marginLeft = (-(referencePosition - delta)) + 'px';
                delta += 50;
            } else {
                clearInterval(myInterval);
            }
        }, 20);
    }

}