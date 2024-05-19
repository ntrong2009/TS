interface Component {
    operation(): string;
}

class ConcreteComponent implements Component {
    public operation(): string {
        return 'ConcreteComponent';
    }
}

class Decorator implements Component {
    protected component: Component;

    constructor(component: Component) {
        this.component = component;
    }

    public operation(): string {
        return this.component.operation();
    }
}

class ConcreteDecoratorA extends Decorator {
    public operation(): string {
        return `ConcreteDecoratorA(${super.operation()})`;
    }
}

class ConcreteDecoratorB extends Decorator {
    public operation(): string {
        return `ConcreteDecoratorB(${super.operation()})`;
    }
}

function clientCode(component: Component) {
    console.log('%c%s', 'color: #d90000', `RESULT : ${component.operation()}`);
}

const simple = new ConcreteComponent();
console.log('%c%s', 'color: #ffa640', 'Client : I\'ve got a simple component');
clientCode(simple);


const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log('%c%s', 'color: #ffa640', 'Client : I\'ve got a simple component');
clientCode(decorator2);