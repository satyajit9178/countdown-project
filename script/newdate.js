document.addEventListener('DOMContentLoaded', () => {
  let interval;

  document.querySelector('#btn').addEventListener('click', () => {
    const dateVal = document.querySelector('#date').value;
    const timeVal = document.querySelector('#time').value;

    if (dateVal === "" || timeVal === "") {
      alert("Please select a date and time");
      return;
    }

    const endDate = new Date(`${dateVal}T${timeVal}`).getTime();
    const startDate = new Date().getTime();

    if (endDate <= startDate) {
      alert("Please select a future date and time");
      return;
    }

    if (interval) clearInterval(interval);

    interval = setInterval(() => {
      const now = new Date().getTime();
      const timeRemaining = endDate - now;
      const totalTime = endDate - startDate;
      const timeCovered = now - startDate;

      if (timeRemaining <= 0) {
        clearInterval(interval);
          document.querySelector('.day').textContent ='00';
          document.querySelector('.hr').textContent = '00';
          document.querySelector('.min').textContent = '00';
          document.querySelector('.sec').textContent = '00';
          document.querySelector('.pr').value = 100;
          document.querySelector('.status').textContent = "EXPIRED";
       
        return;
      }

      const days = Math.floor(timeRemaining / (24 * 60 * 60 * 1000));
      const hours = Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);
      document.querySelector('.status').textContent = "";

      document.querySelector('.day').textContent = days;
      document.querySelector('.hr').textContent = hours;
      document.querySelector('.min').textContent = minutes;
      document.querySelector('.sec').textContent = seconds;

      const percentage = Math.floor((timeCovered / totalTime) * 100);
      document.querySelector('.pr').value = percentage;
    }, 1000);
  });
});
