var burgerIcon = document.getElementById("burger-icon");
var contentDisplay = document.getElementsByClassName("dropdown-content");

burgerIcon.addEventListener("click", function () {
    contentDisplay[0].style.display = 'block';
});

var imageWrapper = document.getElementsByClassName('image-wrapper')[0];
var slideCount = 0;

function changeSlides(direction) {
    if (direction == 1) {
        if (slideCount < 2) {
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
        var myInterval = setInterval(function () {
            referencePosition = slideCount - 1;
            referencePosition = referencePosition * 580;
            if (delta <= 580) {
                imageWrapper.style.marginTop = (-delta - referencePosition) + 'px';
                delta += 29;
            } else {
                clearInterval(myInterval);
            }
        }, 20);
    }
    if (direction == -1) {
        var myInterval = setInterval(function () {
            referencePosition = (slideCount + 1) * 580;
            if (delta <= 580) {
                imageWrapper.style.marginTop = (-(referencePosition - delta)) + 'px';
                delta += 29;
            } else {
                clearInterval(myInterval);
            }
        }, 20);
    }
}