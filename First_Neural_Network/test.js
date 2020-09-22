//an object with the possible inputs of the xor problem and the respective outputs
xor = {
    inputs: [
        [0,0],
        [0,1],
        [1,0],
        [1,1]
    ],
    outputs: [
        [0],
        [1],
        [1],
        [0]
    ]
};

//Here we create the neural network
nn = new NeuralNetwork(2,3,1,.1);

let train = true;

while(train) {
    for (let i=0; i<10000; i++) {
        //first we get a random index in the range (0...3)
        let random = Math.floor(Math.random() * 4);
        let input = xor.inputs[random];
        let output = xor.outputs[random];

        //and then we call the neural network train function
        nn.train(input,output);
    }
    //if after the loop the neural network is predicting correctly we set train to false
    //otherwise the train loop continues
    if(nn.predict([0,0])[0] < 0.04 && nn.predict([1,0])[0] > 0.98) {
        train = false;
    }
}

console.log('Treinou!');
//here the neural network is ready, and we can predict correctly:
console.log(nn.predict([1,1])[0]);
console.log(nn.predict([1,0])[0]);
console.log(nn.predict([0,0])[0]);
console.log(nn.predict([1,0])[0]);










