google.load("feeds", "1");

var postlimit = 10,
    contentLimit = 200,
    feedurl = 'http://blog.qatools.ru/feed.xml',
    container = $("#blog-content");


function initialize() {
    var feed = new google.feeds.Feed(feedurl);
    feed.load(function (result) {
        if (!result.error) {
            var feeds = result.feed.entries;

            $.each(feeds.slice(0, postlimit), function (i, item) {
                console.log(item);
                var match = item.content.match(/<p>(.*)/)[1];
                container
                    .append($('<h4/>')
                        .html('<a href=' + item.link + '>' + item.title + '</a> <small>' + timeDifference(new Date(), new Date(item.publishedDate)) + timerOptions.end + '</small>')
                    )
                    .append($('<div/>')
                        .html((match.length > contentLimit ? match.substr(0, contentLimit) : match) + '... <br/><br/>')
                    );

            });
        }
    });
}
google.setOnLoadCallback(initialize);

