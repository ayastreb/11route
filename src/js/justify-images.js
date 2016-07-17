/**
 * Resize all images inside .image-row blocks to have the same height and fit the row width.
 *
 * Based on http://blog.vjeux.com/2012/image/image-layout-algorithm-google-plus.html
 */
var justifyImages = function () {
    var frameWidth = document.getElementsByClassName('measure')[0].clientWidth,
        imageMargin = getImageMargin(),
        rows = document.querySelectorAll('.image-row');

    for (var i = 0; i < rows.length; i++) {
        var images = rows[i].getElementsByTagName('img'),
            ratioSum = 0;
        for (var j = 0; j < images.length; j++) {
            var ratio = images[j].getAttribute('width') / images[j].getAttribute('height');
            images[j].setAttribute('data-ratio', ratio);
            ratioSum += ratio;
        }

        var commonHeight = (frameWidth - (images.length - 1) * imageMargin) / ratioSum;
        rows[i].style.height = commonHeight + 'px';
        for (var k = 0; k < images.length; k++) {
            images[k].setAttribute('height', commonHeight + 'px');
            var width = commonHeight * images[k].getAttribute('data-ratio');
            images[k].setAttribute('width', width + 'px');
        }
    }

    function getImageMargin() {
        var figure = document.querySelectorAll('.image-row figure')[0];
        if (!figure) {
            return 0;
        }
        var figureStyle = figure.currentStyle || window.getComputedStyle(figure);

        return parseInt(figureStyle.marginRight);
    }
};
