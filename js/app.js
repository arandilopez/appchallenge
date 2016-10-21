(function () {
  Vue.filter('two_digits', function (value) {
    if(value.toString().length <= 1) {
      return "0"+value.toString();
    }
    return value.toString();
  });

  new Vue({
    el: '#app',
    data: {
      date: Math.trunc(new Date(Date.UTC(2016, 10, 4, 24, 0, 0)).getTime() / 1000),
      now: Math.trunc((new Date()).getTime() / 1000)
    },
    computed: {
      seconds: function () {
        return (this.date - this.now) % 60;
      },

      minutes: function () {
        return Math.trunc((this.date - this.now) / 60) % 60;
      },

      hours: function () {
        return Math.trunc((this.date - this.now) / 60 / 60) % 24;
      },

      days: function () {
        return Math.trunc((this.date - this.now) / 60 / 60 / 24);
      },

      days_text: function () {
        return (this.days == 1) ? 'día' : 'días';
      }
    },
    created: function () {
      setInterval(function () {
        this.now = Math.trunc((new Date()).getTime() / 1000);
      }.bind(this), 1000);
    }
  });
})();
