// Wait until the document is fully loaded
$(document).ready(function() {

    // Get the button using jQuery
    const $btn = $('#randomColorBtn');

    /**
     * Generates a random RGB color
     * @returns {string} RGB color string in format 'rgb(r, g, b)'
     */
    function getRandomRgbColor() {
        const red   = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue  = Math.floor(Math.random() * 256);
        return `rgb(${red}, ${green}, ${blue})`;
    }

    /**
     * Changes the page background to a fresh random color
     */
    function changeBackgroundColor() {
        const newColor = getRandomRgbColor();
        $('body').css('backgroundColor', newColor);
    }

    // Attach click event using jQuery (much cleaner!)
    $btn.click(changeBackgroundColor);

    // Optional: Add a nice visual feedback when clicking
    $btn.on('mousedown', function() {
        $(this).css('transform', 'scale(0.95)');
    }).on('mouseup', function() {
        $(this).css('transform', 'scale(1)');
    });

});