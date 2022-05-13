function solve() {
    let btn = document.getElementById('btn');
    let ul = document.getElementById('output');
    let balance = document.getElementById('balance');

    function getDealPrice(min, max) {
        return (Math.random() * (max - min) + min) / 100;
    }
    function resultParser(arr, total, ul) {
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        arr.map(e => {
            let li = document.createElement('li');

            li.textContent = `${e[0]} -> ${(e[1] / total * 100).toFixed(4)}%`;
            ul.appendChild(li);
        });
    }

    function clickHandler(e) {
        e.preventDefault();
        const min = Number(balance.value) * 100 * 0.1;
        const max = (Number(balance.value) * 100 * 0.5);
        let cents = {}

        for (let i = 0; i < 100; i++) {
            let reward = (getDealPrice(min, max) * 0.0026);
            reward = (Math.floor(reward * 100) / 100).toFixed(2);
            if (reward <= 0.01) {
                reward = 0.01;
            }
            if (cents.hasOwnProperty(reward) == false) {
                cents[reward] = 0;
            }
            cents[reward] += 1;
        }

        let total = Object.values(cents).reduce((a, b) => a + b);
        console.log(Object.values(cents).slice(100));
        if (balance.value != '') {
            resultParser(Object.entries(cents).filter(e => e[1] != 0), total, ul);
        }

        balance.value = '';
    }

    btn.addEventListener('click', clickHandler);
}

document.addEventListener('DOMContentLoaded', solve);