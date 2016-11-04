new Vue({
  el: '#start',
  data: {
    started: false,
    finished_date: Date.now()
  },


  methods: {
    begin: function (event) {
      var next_day = new Date();
      next_day.setUTCDate(next_day.getUTCDate() + 1);
      firebase.database()
      .ref('/data')
      .set({
        started: true,
        finished_date: next_day.toUTCString()
      });
    }
  },

  created: function () {
    firebase.database()
    .ref('/data')
    .on('value', function (snap) {
      this.finish_date = Math.trunc(new Date(snap.val().finished_date).getTime() / 1000);
      this.started = snap.val().started;
    }.bind(this));
  },
});
