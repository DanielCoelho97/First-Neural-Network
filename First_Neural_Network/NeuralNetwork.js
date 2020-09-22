class NeuralNetwork {

    //in the constructor we define the number of nodes of the:
    //input layer -> i_nodes
    //hidden layer -> h_nodes
    //output layer -> o_nodes
    //In this neural network we just have 1 hidden layer
    //--------------------------
    //Besides that we define the learning rate
    //Define the input to hidden weights (ih_weights), creating a new Matrix object
    //Define the hidden to output weights (ho_weights), creating a new Matrix object
    //Define the input to hidden bias (ih_bias), creating a new Matrix object
    //Define the hidden to output bias (ho_bias), creating a new Matrix object
    constructor(i_nodes, h_nodes, o_nodes, learning_rate) {
        this.i_nodes = i_nodes;
        this.h_nodes = h_nodes;
        this.o_nodes = o_nodes;

        this.learning_rate = learning_rate;

        this.defineWeights();
        this.defineBias();
    }

    defineWeights() {
        this.ih_weights = new Matrix(this.h_nodes, this.i_nodes);
        this.ho_weights = new Matrix(this.o_nodes, this.h_nodes);
    }

    defineBias() {
        this.ih_bias = new Matrix(this.h_nodes, 1);
        this.ho_bias = new Matrix(this.o_nodes, 1);
    }

    //the train function consists in 2 parts: the feedforward and the backpropagation
    train(input, target) {
        this.feedForward(input);
        this.backPropagation(input, target);
    }

    //In the feedforward process we give an input an the neural network gives us an output
    //Obviously in the beggining, beacause the weights and bias are random values, the
    //output will be random as well. But with the backpropagation process the weigths and
    //bias begin to be corrected. So we repeat the 2 processes over and over again, until
    //we have the desirable result
    feedForward(input) {
        //Input to Hidden
        input = Matrix.arrayToMatrix(input);
        let hidden = Matrix.multiply(this.ih_weights, input);
        hidden = Matrix.add(hidden, this.ih_bias);
        this.activated_hidden = Matrix.map2(hidden, sigmoid);

        //Hidden to Output
        let output = Matrix.multiply(this.ho_weights, this.activated_hidden);
        output = Matrix.add(output, this.ho_bias);
        //Returning the output activatedNeurons
        this.activated_output = Matrix.map2(output, sigmoid);
    }

    //This is when we smoothly correct our weights and bias. The 2 are corrected as fast
    //as we define our learning rate.
    backPropagation(input, target) {
        //Output to Hidden
        input = Matrix.arrayToMatrix(input);
        target = Matrix.arrayToMatrix(target);
        let output_error = Matrix.subtract(target, this.activated_output);
        let d_output = Matrix.map2(this.activated_output, dSigmoid);
        let hidden_t = Matrix.transpose(this.activated_hidden);

        let gradient = Matrix.hadamard(output_error, d_output);
        gradient = Matrix.multiply_by_escalar(gradient, this.learning_rate);

        //here we correct out hidden to output bias
        this.ho_bias = Matrix.add(this.ho_bias, gradient);

        let deltas_ws_ho = Matrix.multiply(gradient, hidden_t);
        //Here we correct our hidden to output weights
        this.ho_weights = Matrix.add(deltas_ws_ho, this.ho_weights);


        //Hidden to Input
        let ho_weigths_T = Matrix.transpose(this.ho_weights);
        let hidden_error = Matrix.multiply(ho_weigths_T, output_error);
        let d_hidden = Matrix.map2(this.activated_hidden, dSigmoid);
        let input_T = Matrix.transpose(input);

        let gradient_h = Matrix.hadamard(hidden_error, d_hidden);
        gradient_h = Matrix.multiply_by_escalar(gradient_h, this.learning_rate);

        //here we correct out input to hidden bias
        this.ih_bias = Matrix.add(this.ih_bias, gradient_h);

        let deltas_ws_ih = Matrix.multiply(gradient_h, input_T);
        //here we correct our input to hidden weights
        this.ih_weights = Matrix.add(deltas_ws_ih, this.ih_weights);
    }

    predict(array) {
        //The prediction consists only in the feedforward part
        this.feedForward(array);
        return Matrix.matrixToArray(this.activated_output);
    }

}
