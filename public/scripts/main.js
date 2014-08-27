(function() {
    $('.robot-forward').on('click', function() {
        $.ajax({
            url: '/forward',
            type: 'GET'
        });
    });

    $('.robot-back').on('click', function() {
        $.ajax({
            url: '/back',
            type: 'GET'
        });
    });

    $('.robot-stop').on('click', function() {
        $.ajax({
            url: '/stop',
            type: 'GET'
        });
    });

    $('.robot-left').on('click', function() {
        $.ajax({
            url: '/left',
            type: 'GET'
        });
    });

    $('.robot-right').on('click', function() {
        $.ajax({
            url: '/right',
            type: 'GET'
        });
    });
})();