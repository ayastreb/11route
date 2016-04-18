var resizeImages = function (selector) {
    var frameWidth = document.getElementsByClassName('measure')[0].clientWidth;
    var rows = document.querySelectorAll(selector);
    for (var i = 0; i < rows.length; i++) {
        var images = rows[i].getElementsByTagName('img');
        var totalRatio = 0;
        for (var j = 0; j < images.length; j++) {
            var ratio = images[j].getAttribute('width') / images[j].getAttribute('height');
            images[j].setAttribute('data-ratio', ratio);
            totalRatio += ratio;
        }

        var commonHeight = (frameWidth - (images.length - 1) * 10) / totalRatio;
        for (var k = 0; k < images.length; k++) {
            images[k].setAttribute('height', commonHeight + 'px');
            var width = commonHeight * images[k].getAttribute('data-ratio');
            images[k].setAttribute('width', width + 'px');
        }
    }
};
