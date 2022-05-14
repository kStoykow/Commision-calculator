function solve() {
    let btn = document.getElementById('btn');
    let ul = document.getElementById('output');

    function getDealPrice(min, max) {
        return (Math.random() * (max - min) + min) / 100;
    }

    function resultParser(arr, total, ul) {
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        let li = document.createElement('li');
        li.textContent = `Reward chances for ${Number(balance.value).toFixed(2)}$ are:`;
        li.style.marginBottom = '1rem';
        ul.appendChild(li);

        let rewardLi = document.createElement('li');
        rewardLi.textContent = `Total roughly reward is around ${(calcTotalTheoreticalReward(arr.sort((a, b) => a[0] - b[0]), total)).toFixed(2)}$.`;
        rewardLi.style.marginBottom = '1rem';

        ul.appendChild(rewardLi);
        arr.map(e => {
            let li = document.createElement('li');
            li.textContent = `${e[0]}$ --> ${(e[1] / total * 100).toFixed(4)}%`;
            ul.appendChild(li);
        });
    }

    function calcTotalTheoreticalReward(list, total) {
        let totalReward = 0;
        list.map(e => {
            totalReward += (50 * ((e[1] / total * 100) / 100) * Number(e[0]));
        });

        return totalReward;
    }

    function clickHandler(e) {
        e.preventDefault();
        const min = Number(balance.value) * 100 * 0.1;
        const max = (Number(balance.value) * 100 * 0.5);
        let cents = {};

        for (let i = 0; i < 1000000; i++) {
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

        if (balance.value != '') {
            resultParser(Object.entries(cents).sort((a, b) => a[0] - b[0]), total, ul);
        }

        balance.value = '';
    }

    btn.addEventListener('click', clickHandler);
}

document.addEventListener('DOMContentLoaded', solve);