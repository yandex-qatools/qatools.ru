
$(document).ready(function () {
    var owner = $('#site-owner-link').data('github');
    var github = new Github({
        username: "qatools-site-bot",
        password: "bot-site-qatools",
        auth: "basic"
    });

    $('#products .description[id]').each(function(){

        var repo = github.getRepo(owner, this.id);

        repo.show(function(err, repo) {
            $(this).text(repo.description);
//            $(this).after(
//               $('<a/>').attr('href', repo.html_url).attr('class', 'button small').text('More')
//            );
        }.bind(this));

    });


});
