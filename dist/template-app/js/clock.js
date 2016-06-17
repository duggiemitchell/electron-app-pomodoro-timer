(function() {
            var COLORS = "emerald peter-river sun-flower pumpkin pomegranate black".split(" ");
            var duration = 25 * 60;
            var started_at = null;
            var interval = null;
            var counter = 25;
            function start() {
              try {
                duration = parseDuration();
              } catch(e) {
                alert(e);
                return;
              }
              started_at = now();
              if (interval) { clearInterval(interval); }
              $('#main, #break').addClass('started');
              $('body').removeClass().addClass(COLORS[0]);
              $('#countdown').show();
              interval = setInterval(updateColor, 1000);
              setTimeout(function() { $('#main, #break').hide(); }, 5000);
            }
            function stop() {
              clearInterval(interval);
              document.title = "Break!";
              $('#main, #break').show();
              $('#main, body, #break').removeClass();
              $('#countdown').hide();
              setFavicon();
            }
            function parseDuration() {
            var tokens = $('#counter').text().split(":");
              if (tokens.length != 2) {
                throw new Error("You must set a time with the 'mm:ss' format");
              }
              return 60 * parseInt(tokens[0]) + parseInt(tokens[1]);
            }
            function now() {
              return parseInt(new Date().getTime() / 1000);
            }
            function timeRemaining() {
              return started_at + duration - now();
            }
            function getColor() {
              var remaining = timeRemaining();
              var i = -1;
              var half = duration;
              while (remaining < half && i < (COLORS.length - 1)) {
                i += 1;
                half = half / 2;
              }
              return COLORS[i];
            }
            function updateColor() {
              $('body').removeClass().addClass(getColor());
              var remaining = timeRemaining();
              setFavicon();
              if (remaining < 0) {
                stop();
              } else {
                updateTitle(remaining);
                updateCountdown(remaining);
              }
            }
            function updateTitle(remaining) {
              document.title = remainingToMinSec(remaining);
            }
            function updateCountdown(remaining) {
              if ($('#countdown').data('hidden')) {
                $('#countdown').html("");
              } else {
                $('#countdown').html(remainingToMinSec(remaining));
              }
            }
            function remainingToMinSec(remaining) {
              var min = parseInt(remaining / 60);
              var sec = remaining % 60;
              sec = sec < 10 ? ("0" + sec) : sec;
              return min + ":" + sec;
            }
            function setFavicon() {
              var canvas = document.createElement("canvas");
              var size = 16 * (window.devicePixelRatio || 1);
              canvas.width = size;
              canvas.height = size;
              var context = canvas.getContext("2d");
              context.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI, false);
              context.fillStyle = $('body').css('background-color');
              context.fill();
              $('#favicon').attr('href', canvas.toDataURL(0)).remove().appendTo('head');
            }
            function toggleCountdown() {
              if ($('#countdown').data('hidden')) {
                $('#countdown').data('hidden', false);
              } else {
                $('#countdown').data('hidden', true);
              }
              updateCountdown(timeRemaining());
            }
            $(document).ready(function() {
              $("#plus").click(function(){
                counter++;
              $("#counter").text(counter + ":00");
                });
              $("#minus").click(function(){
                counter --;
              $("#counter").text(counter + ":00");
                });
              $('#start').on('click', start);
              $('#countdown').on('click', toggleCountdown)
            });
          })();
