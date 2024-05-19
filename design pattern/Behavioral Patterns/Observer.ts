interface Observer {
    update(subject: Subject): void;
}

interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
}

class ConcreteSubject implements Subject {
    public state: number;
    private observers: Observer[] = [];

    public attach(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            console.log('%c%s', 'color: #ff0000', 'Observer has been attached already');
        }

        console.log('%c%s', 'color: #00e600', 'Attached an observer');
        this.observers.push(observer);
    }

    public detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            console.log('%c%s', 'color: #00a3cc', 'Nonexistent observer');
        }

        this.observers.splice(observerIndex, 1);
        console.log('%c%s', 'color: #aa00ff', 'Detached an observer');
    }

    public notify(): void {
        console.log('%c%s', 'color: #e50000', 'Notifying observer ...');
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    public someBussinessLogic(): void {
        console.log('%c%s', 'color: #733d00', 'Im doing some important');
        this.state = Math.floor(Math.random() * (10 + 1));

        console.log('%c%s', 'color: #00bf00', `My state has just changed to ${this.state}`);
        this.notify();
    }
}

class ConcreteObserverA implements Observer {
    public update(subject: Subject): void {
        if (subject instanceof ConcreteSubject && subject.state < 3) {
            console.log('%c%s', 'color: #0088cc', 'ConcreteObserverA : Reacted to the event.');
        }
    }
}

class ConcreteObserverB implements Observer {
    public update(subject: Subject): void {
        if (subject instanceof ConcreteSubject && (subject.state === 0 || subject.state >= 2)) {
            console.log('%c%s', 'color: #917399', 'ConcreteObserverB : Reated to the event.');
        }
    }
}

const subject = new ConcreteSubject();
const observer1 = new ConcreteObserverA();
subject.attach(observer1);

const observer2 = new ConcreteObserverB();
subject.attach(observer2);

subject.someBussinessLogic();
subject.someBussinessLogic();

subject.detach(observer2);
subject.someBussinessLogic();