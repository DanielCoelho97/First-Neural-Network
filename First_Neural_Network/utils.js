function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function sigmoid(x) {
    return 1/(1 + Math.exp(-x));
}

function dSigmoid(x) {
    return x * (1-x);
}
