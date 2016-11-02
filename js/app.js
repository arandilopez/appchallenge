(function () {
  Vue.filter('two_digits', function (value) {
    if(value.toString().length <= 1) {
      return "0"+value.toString();
    }
    return value.toString();
  });

  var Down = {
    props:['date', 'now'],
    data: function () {
      return {
        nombre: 'Arandi'
      }
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
    },
  };

  var First = {
    props: ['date', 'now'],
    data: function () {
      return {
      }
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
      },
    },
  }

  new Vue({
    el: '#app',
    data: {
      // date: Math.trunc(new Date(Date.UTC(2016, 10, 1, 24, 0, 0)).getTime() / 1000),
      date: Math.trunc(new Date("2016-11-05").getTime() / 1000),
      finish_date: Math.trunc(new Date("2016-11-06").getTime() / 1000),
      now: Math.trunc((new Date()).getTime() / 1000),
      started: false
    },
    computed: {
      has_begun: function () {
        return !(this.now < this.date);
      }
    },
    components: {
      'DownCounter': Down,
      'First': First,
    },
    created: function () {
      firebase.database()
        .ref('/data')
        .on('value', function (snap) {
          this.finish_date = Math.trunc(new Date(snap.val().finished_date).getTime() / 1000);
          this.started = snap.val().started;
        }.bind(this));

      setInterval(function () {
        this.now = Math.trunc((new Date()).getTime() / 1000);
      }.bind(this), 1000);
    }
  });
})();
