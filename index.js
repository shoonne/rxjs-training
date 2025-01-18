const { Observable } = require("rxjs");
const { map, filter } = require("rxjs/operators");

const users = {
  data: [
    { status: "active", age: 20 },
    { status: "inactive", age: 20 },
    { status: "inactive", age: 54 },
    { status: "active", age: 20 },
  ],
};

const users2 = {
  data: [
    { status: "active", age: 10 },
    { status: "inactive", age: 32 },
    { status: "inactive", age: 54 },
    { status: "active", age: 17 },
    { status: "inactive", age: 20 },
    { status: "active", age: 22 },
    { status: "active", age: 32 },
  ],
};
const observable = new Observable((subscriber) => {
  subscriber.next(users2);
  subscriber.next(users);
  subscriber.next(users2);
}).pipe(
  map((value) => {
    //console.log("1) Got data from observable", value);
    return value.data;
  }),
  filter((value) => value.length >= 5),
  map((value) => {
    //console.log("2) Got data from first operator", value);
    return value.filter((user) => user.status === "active");
  }),
  map((value) => {
    //console.log("3) Got data from second operator", value);
    return value.reduce((sum, user) => sum + user.age, 0) / value.length;
  }),
  map((value) => {
    //console.log("4) Got data from third operator", value);
    if (value < 18) {
      throw new Error("Average age is less than 18");
    }
    return value;
  })
);

const observer = {
  next: (value) => console.log("Observer got a value of: " + value),
  error: (error) => console.log("Observer got an error: " + error),
  complete: () => console.log("Observer got a complete notification"),
};

observable.subscribe(observer);
