(function() {
    $('.robot-move').on('click', function() {
        $.ajax({
            url: '/move',
            type: 'GET'
        });
    });

    $('.robot-stop').on('click', function() {
        $.ajax({
            url: '/stop',
            type: 'GET'
        });
    });
})();