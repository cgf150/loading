var util = {
    loadingInstance: null,
    loadingTime: 500,
    loading: function(loadingText) {
        var that = this;
        that.startTime = (new Date);
        if (!that.loadingInstance) {
            var newDiv = document.createElement('div');
            newDiv.className = "loading";
            newDiv.innerHTML = '\
                    <div class="loading_wrap">\
                        <img src="img/loading5.gif" width="60" alt="loading" class="loading_img">\
                        <div class="loading_text">' + loadingText + '</div>\
                    </div>\
                ';
            document.body.appendChild(newDiv);
            that.loadingInstance = newDiv;
        }

        if (!that.isStyle) {
            var sStyle = '.loading {display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#66000000,endColorstr=#66000000); } .loading_wrap{position: fixed; top: -20%; left: 50%; margin-left: -150px; margin-top: -50px; width: 300px; height: 100px; line-height: 100px; background-color: #ddd; border-radius:5px; -webkit-box-shadow: -1px -1px 10px rgba(0,0,0,0.2); -mz-box-shadow: -1px -1px 10px rgba(0,0,0,0.2); box-shadow: -1px -1px 50px rgba(0,0,0,0.2); } .loading_img{ width:60px; margin-left: 20px; margin-right: 10px; display: inline-block; *display:inline; vertical-align: middle; } .loading_text {display: inline; *display:inline; font-family: "Microsoft Yahei"}';

            var oStyle = document.createElement('style');

            if ('styleSheet' in oStyle) {
                oStyle.setAttribute('type', 'text/css')
                oStyle.styleSheet.cssText = sStyle
            } else {
                oStyle.innerHTML = sStyle
            }
            document.getElementsByTagName('head')[0].appendChild(oStyle);
            that.isStyle = true;
        }

        $(that.loadingInstance).find('.loading_text').html(loadingText);

        // 进场动画
        $(that.loadingInstance).fadeIn(100, function() {
            $(that.loadingInstance).find('.loading_wrap').animate({
                top: '50%'
            }, 'slow')
        });
    },
    loadingHide: function() {
        var that = this;
        var passTime = (new Date) - this.startTime;
        passTime = passTime <= 1000 ? 1000 : 0;

        // 出场动画
        function fnHide() {
            $(that.loadingInstance).find('.loading_wrap').animate({
                top: '120%'
            }, function() {;
                $(that.loadingInstance).fadeOut(500, function() {
                    $('.loading_wrap').css({
                        top: '-120%'
                    })
                    clearTimeout(timer);
                    timer = null;
                });
            });
        }

        var timer = setTimeout(fnHide, passTime);
    },
    on: function(el, sEvent, handler) {
        if (el.addEventListener) {
            el.addEventListener(sEvent, handler, false);
        } else if (el.attachEvent) {
            el.attachEvent('on' + sEvent, handler);
        }
    },
    off: function(el, sEvent, handler) {
        if (el.addEventListener) {
            el.removeEventListener(sEvent, handler, false);
        } else {
            el.detachEvent('on' + sEvent, handler);
        }
    }
 }