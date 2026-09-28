export default function possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  if (call !== undefined) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  if (self === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
