/* global list of timers */
var timers = [];
var next_id = 1;

function update_stats() {
    let num_active_timers = document.querySelector("#num_active_timers");
    /* TODO: Find the DOM nodes as JS objects (Elements)
    */
    let num_expired_timers = document.querySelector("#num_expired_timers");
    let avg_remain_time = document.querySelector("#avg_remain_time");

    /* TODO: Complete these stats calculations. 
    Hint: use Array.reduce on timers;
    */
    let num_expired = timers.reduce((acc, timer) => acc + (timer.expired ? 1 : 0), 0);
    let num_active = timers.reduce((acc, timer) => acc + (!timer.expired ? 1 : 0), 0);
    let avg_seconds = timers.length > 0 ? timers.reduce((acc, timer) => acc + (timer.minutes * 60 + timer.seconds), 0) / timers.length : 0;
    num_active_timers.innerHTML = num_active;
    num_expired_timers.innerHTML = num_expired;
    avg_remain_time.innerHTML = Math.ceil(avg_seconds);
}

class Timer {
    constructor(minutes, seconds, update, remove) {
        this.id = next_id;
        next_id += 1;
        this.minutes = minutes;
        this.seconds = seconds;
        this.update = update;
        this.remove = remove;
        this.expired = (minutes === 0 && seconds === 0);

        this.update(this.minutes, this.seconds);

        if (!this.expired) {
            this.interval = setInterval(() => {
                if (this.minutes === 0 && this.seconds === 0) {
                    clearInterval(this.interval);
                    this.expired = true;
                    update_stats();
                    return;
                }
                if (this.seconds === 0) {
                    if (this.minutes > 0) {
                        this.minutes -= 1;
                        this.seconds = 59;
                    }
                } else {
                    this.seconds -= 1;
                }
                update_stats();
                this.update(this.minutes, this.seconds);
            }, 1000);
        }
    }

    extend(seconds) {
        let was_expired = this.expired; 
        let total = this.minutes * 60 + this.seconds + seconds;
        if (total < 0) total = 0;
        this.minutes = Math.floor(total / 60);
        this.seconds = total % 60;
        this.expired = (this.minutes === 0 && this.seconds === 0);
        this.update(this.minutes, this.seconds);

        // Revive and restart interval if timer was expired and now has time
        if (was_expired && !this.expired) {
            if (this.interval) clearInterval(this.interval);
            this.interval = setInterval(() => {
                if (this.minutes === 0 && this.seconds === 0) {
                    clearInterval(this.interval);
                    this.expired = true;
                    update_stats();
                    return;
                }
                if (this.seconds === 0) {
                    if (this.minutes > 0) {
                        this.minutes -= 1;
                        this.seconds = 59;
                    }
                } else {
                    this.seconds -= 1;
                }
                update_stats();
                this.update(this.minutes, this.seconds);
            }, 1000);
        }
    }
}


function create_timer(event, form)
{
    /* we don't actually want to submit a request */
    event.preventDefault();

    let name = form["name"].value.trim();
    let minutes = parseInt(form["minutes"].value);
    let seconds = parseInt(form["seconds"].value);
    let error = form.getElementsByClassName("error")[0];

    if (minutes < 0 || seconds < 0 || minutes * 60 + seconds <= 0) {
        error.innerHTML = "value must be greater than zero.";
        return false;
    }
    else {
        error.innerHTML = "";
    }

    let container = document.createElement("details");
    const new_id = next_id;
    const remove = (_e) => {
        timers = timers.filter((elem) => elem.id !== new_id);
        container.remove(); 
        update_stats();
    };

    let timer = new Timer(
        minutes,
        seconds,
        (m, s) => {
            let minutes = Array.from(container.getElementsByClassName("minutes"));
            let seconds = Array.from(container.getElementsByClassName("seconds"));
            minutes.forEach((elem, _i) => { elem.innerHTML = m; });
            seconds.forEach((elem, _i) => { elem.innerHTML = String(s).padStart(2, "0"); });
        },
        remove
    );

    const seconds_padded = String(seconds).padStart(2, "0");
    container.innerHTML = `
        <summary>${name}<a href="#">&#x274c;</a></summary>
        <div>
        <span class="minutes">${minutes}</span>:<span class="seconds">${seconds_padded}</span>
        </div>
    `;
    container.setAttribute("open", "");
    let anchors = Array.from(container.getElementsByTagName("a"));
    anchors.forEach((elem, _i) => { elem.addEventListener("click", remove) });

    let main = document.getElementById("main");
    main.appendChild(container);
    timers.push(timer);

    return false;
}

function extend_all_timers(event, form) {
    /* we don't actually want to submit a request */
    event.preventDefault();
    let seconds = parseInt(form["seconds"].value);
    let error = form.getElementsByClassName("error")[0];
    if (seconds <= 0) {
        error.innerHTML = "value must be greater than zero.";
        return false;
    }
    else {
        error.innerHTML = "";
    }

    /* TODO: Extend all timers' values by `seconds`. Hint: use Array.forEach. */

    timers.forEach((timer) => {
        timer.extend(seconds);
    });
    update_stats()

    return false;
}

function clear_expired_timers(event) {
    event.preventDefault();

    timers.forEach(timer => {
        if (timer.expired) {
            if (timer.interval) {
                clearInterval(timer.interval);
            }
            timer.remove();
        }
    });

     // filter out expired timers from the array
    timers = timers.filter(timer => !timer.expired);

    update_stats();
}