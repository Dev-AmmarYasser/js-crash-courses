let a = 10;
function outer() {
  let b = 20;
  function inner() {
    let c = 30;
    console.log(a, b, c);
  }
  inner();
}
outer();

function outer() {
  let counter = 0;
  function inner() {
    counter++;
    console.log(counter);
  }
  return inner;
}
const fn = outer();

fn();
fn();

function sum(a, b, c) {
  return a + b + c;
}

console.log(sum(2, 3, 5));

function curry(fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return fn(a, b, c);
      };
    };
  };
}

const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(4));

function sum(a) {
  return function (b) {
    return a + b;
  };
}

const sumStart = sum(5);

console.log(sumStart(3)); // 8
console.log(sumStart(6)); // 11

const add2 = sum(2);
const add3 = sum(3);

console.log("-".repeat(10));
console.log("-".repeat(10));

console.log(add2(0));
console.log(add3(0));

console.log("-".repeat(10));

function sayMyName(name) {
  console.log(`My Name is ${name}`);
}

sayMyName("Ammar Yasser");

const person = {
  name: "Ammar",
  sayMyName: function () {
    console.log(`My Name is ${this.name}`);
  },
};

// person.sayMyName();

function sayMyName() {
  console.log(`My Name is ${this.name}`);
}

sayMyName.call(person);

globalThis.name = "as";

sayMyName();

function Person(fName, lName) {
  this.firstName = fName;
  this.lastName = lName;
}

class Person {
  constructor(fName, lName) {
    this.firstName = fName;
    this.lastName = lName;
  }
  sayMyName() {
    return `My Name is ${this.firstName} ${this.lastName}`;
  }
}

class SuperHero extends Person {
  constructor(fName, lName) {
    super(fName, lName);
    this.isSuperHero = true;
  }
  fightCrime() {
    console.log("Fighting Crime...");
  }
}

const classP1 = new Person("Ammar", "Yasser");
console.log(classP1.sayMyName());

const batman = new SuperHero("Ammar", "Yasser");
console.log(batman.sayMyName());

const p1 = new Person("Ammar", "Yasser");
const p2 = new Person("Doro", "Koro");

Person.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
}; // ==> Will Be Copied To Each Instance Of The Function

function SuperHero(fName, lName) {
  // this = {}
  Person.call(this, fName, lName);
  this.isSuperHero = true;
}

SuperHero.prototype = Object.create(Person.prototype);

SuperHero.prototype.fightCrime = function () {
  console.log("Fighting Crime");
};

SuperHero.prototype.constructor = SuperHero;
// Tells JS that SuperHero is a constructor and not an instance of Person Obj

// const batman = new SuperHero("Ammar", "Yasser");

console.log(batman.getFullName());

console.log("-", p1.getFullName());
console.log("-", p2.getFullName());

const obj = {
  [Symbol.iterator]: function () {
    let step = 0;
    const iterator = {
      next: function () {
        step++;
        if (step === 1) {
          return { value: "Hello", done: false };
        } else if (step === 2) {
          return { value: "World", done: false };
        }
        return { value: undefined, done: true };
      },
    };
    return iterator;
  },
};

for (const word of obj) {
  console.log(word);
}

function* generatorFunction() {
  yield "Hello";
  yield "World";
}

const generatorObj = generatorFunction();

for (const word of generatorObj) {
  console.log(word);
}

const promise = new Promise((resolve, reject) => {
  // Success
  setTimeout(() => {
    resolve("Bringing Tacos");
  }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
  // Failure
  setTimeout(() => {
    reject("Not Bringing Tacos...");
  }, 1000);
});

const onFullfillment = (result) => {
  console.log(result);
  console.log("Success");
};

const onRejection = (err) => {
  console.log(err);
  console.log("Failure");
};

promise.then(onFullfillment);
promise2.catch(onRejection);

function resolveHello() {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve("Hello");
    }, 2000);
  });
}

function resolveWorld() {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve("World");
    }, 1000);
  });
}

// Sequential excution

async function sequentialStart() {
  const hello = await resolveHello();
  console.log(hello);

  const world = await resolveWorld();
  console.log(world);
}

sequentialStart();

// Concurrent excution

async function concurrentStart() {
  const hello = resolveHello();
  const world = resolveWorld();

  console.log("-".repeat(10));

  console.log(await hello);
  console.log(await world);
}
concurrentStart();

async function parallel() {
  await Promise.all([
    (async () => console.log(await resolveHello()))(),
    (async () => console.log(await resolveWorld()))(),
  ]);
  console.log("Finally");
}

parallel();
