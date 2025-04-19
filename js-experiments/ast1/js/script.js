function printAstrik(count) {
    var a = [];
    var b = '*';
    for (var i = 1; i <= count; i++) {
        a.push(b);
    }
    a = a.toString();
    console.log(a.replace(/,/g, ""));
}

function animate() {
    var count = 1;
    var countVar = 1;
    setInterval(function() {
        if (count == 6) {
            countVar = -1;
        }
        if (count == 1) {
            countVar = 1;
        }
        printAstrik(count);
        count = count + countVar;
    }, 200);
}