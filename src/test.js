import assert from 'assert';
import {assertThat, instanceOf, throws, hasProperty} from 'hamjest';

class MyError extends Error {
  constructor(...args) {
    super(...args);
  }
}

function throwingFunction() {
  throw new MyError('this is myerror');
}

describe('catch my error', () => {

  it('finds error', () => {
    assertThat(throwingFunction, throws(instanceOf(MyError)));
  });

  it('sees the messages', () => {
    assertThat(throwingFunction, throws(hasProperty('message')));
  });

  it('sees the messages content', () => {
    assertThat(throwingFunction, throws(hasProperty('message', 'this is myerror')));
  });
});

class PureError {
  constructor(message) {
    this.message = message;
  }
}
class PurePureError extends PureError {
  constructor(message) {
    super(message);
  }
}
const throwPureError = () => {
  throw new PurePureError('I am pure');
};
describe('catches a pure error?', () => {
  it('hopefully', () => {
    assertThat(throwPureError, throws(instanceOf(PureError)));
  });
  it('hopefully PurePureError', () => {
    assertThat(throwPureError, throws(instanceOf(PurePureError)));
  });
});
