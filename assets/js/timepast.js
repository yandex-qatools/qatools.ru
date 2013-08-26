var timerOptions = jQuery.extend({
    lang: {
        years: ['год', 'года', 'лет'],
        months: ['месяц', 'месяца', 'месяцев'],
        days: ['день', 'дня', 'дней'],
        hours: ['час', 'часа', 'часов'],
        minutes: ['минута', 'минуты', 'минут'],
        seconds: ['секунда', 'секунды', 'секунд'],
        plurar: function (n) {
            return (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        }
    },
    end: " назад",
    tolkochto: "только что"
});


var timeDifference = function (end, begin) {
    if (end < begin) return '';
    var difference = {
        seconds: [end.getSeconds() - begin.getSeconds(), 60],
        minutes: [end.getMinutes() - begin.getMinutes(), 60],
        hours: [end.getHours() - begin.getHours()  , 24],
        days: [end.getDate() - begin.getDate()   , new Date(begin.getYear(), begin.getMonth() + 1, 0).getDate()],
        months: [end.getMonth() - begin.getMonth()  , 12],
        years: [end.getYear() - begin.getYear()   , 0]
    };
    if (difference.years[0] != 0) {
        delete (difference.days);
        delete (difference.hours);
        delete (difference.minutes);
        delete (difference.seconds);
    }
    else if (difference.months[0] != 0) {
        delete (difference.hours);
        delete (difference.minutes);
        delete (difference.seconds);
    }
    else if (difference.days[0] != 0) {
        delete (difference.minutes);
        delete (difference.seconds);
    }
    else if (difference.hours[0] != 0)
        delete (difference.seconds);
    var result = new Array();
    var flag = false;
    for (i in difference) {
        if (flag) {
            difference[i][0]--;
            flag = false;
        }
        if (difference[i][0] < 0) {
            flag = true;
            difference[i][0] += difference[i][1];
        }
        if (!difference[i][0]) continue;
        result.push(difference[i][0] + ' ' + timerOptions.lang[i][timerOptions.lang.plurar(difference[i][0])]);
    }
    return result.reverse().join(' ');
};


jQuery.fn.timeUpdate = function (filter, attr, interval) {
        var timeUpdate = function () {
        var need_to_time_update = $(filter);
        if (need_to_time_update.size() > 0) {
            need_to_time_update.each(function (i) {
                var date = parseInt(need_to_time_update.eq(i).attr(attr));
                var s = timeDifference(new Date(), new Date(date));
                if (s.length) need_to_time_update.eq(i).html(s + timerOptions.end);
                else need_to_time_update.eq(i).html(timerOptions.tolkochto);
            });
        }
    };
    timeUpdate();
    var timer = setInterval(timeUpdate, interval);
};

/*
 # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ #
 # Использование                                                            #
 # <span time="29348723948" class="need_to_time_update"></span>     #
 # $("#countdown-example").timeUpdate('.need_to_time_update','time',1000);  #
 # Где - time="28746238741" Это - таймштамп #
 # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ #
 */

