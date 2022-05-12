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
            li.textContent = `${e[0]} -> ${(e[1] / total * 100).toFixed(2)}%`;
            ul.appendChild(li);
        });
    }

    function clickHandler(e) {
        e.preventDefault();
        const min = Number(balance.value) * 100 * 0.1;
        const max = (Number(balance.value) * 100 * 0.5) + 1;
        let cents = {
            '0.01': 0,
            '0.02': 0,
            '0.03': 0,
            '0.04': 0,
            '0.05': 0,
            '0.06': 0,
            '0.07': 0,
            '0.08': 0,
            '0.09': 0,
            '0.10': 0,
            '0.11': 0,
            '0.12': 0,
            '0.13': 0,
            '0.14': 0,
            '0.15': 0,
            '0.16': 0,
            '0.17': 0,
            '0.18': 0,
            '0.19': 0,
            '0.20': 0,
            '0.21': 0,
            '0.22': 0,
            '0.23': 0,
            '0.24': 0,
            '0.25': 0,
            '0.26': 0,
            '0.27': 0,
            '0.28': 0,
            '0.29': 0,
            '0.30': 0,
            '0.31': 0,
            '0.32': 0,
            '0.33': 0,
            '0.34': 0,
            '0.35': 0,
            '0.36': 0,
            '0.37': 0,
            '0.38': 0,
            '0.39': 0,
            '0.40': 0,
        }

        for (let i = 0; i < 1000000; i++) {
            let deal = (getDealPrice(min, max) * 0.0026).toFixed(2);
            if (deal < 0.01) {
                deal = 0.01;
            }
            cents[deal]++;
        }

        let total = Object.values(cents).reduce((a, b) => a + b);

        if (balance.value != '') {
            resultParser(Object.entries(cents).filter(e => e[1] != 0), total, ul);
        }

        balance.value = '';
    }

    btn.addEventListener('click', clickHandler);
}

document.addEventListener('DOMContentLoaded', solve);