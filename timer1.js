const refs = {
    clockface: document.querySelector('.timer'),
};

class CountdownTimer {
    constructor({selector, targetDate}) {
        this.selector = selector;
        this.targetDate = targetDate;
    }
    
    startCount() {
        let startTime = this.targetDate.getTime();
        const INTERVAL = 1000;

        setInterval(() => {
            if (startTime <= Date.now()) {
                return;
            } else {
                const currentTime = Date.now();
                const delta = startTime - currentTime;
                const countdown = this.getTimeComponents(delta);
                this.createClockface(countdown)
            }
        }, INTERVAL)
    };

    createClockface({days, hours, mins, secs}) {
        refs.clockface.textContent = `${days}:${hours}:${mins}:${secs}`
    }

    pad(value) {
        return String(value).padStart(2, '0')
    }

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor(time % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor(time % (1000 * 60 * 60) / (1000 * 60)));
        const secs = this.pad(Math.floor(time % (1000 * 60) / 1000));

        return {days, hours, mins, secs}
    };
};

const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2021'),
});

timer.startCount();
