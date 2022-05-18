import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';

export default class CounterComponent extends Component {
  @tracked count = 1;
  @action increment() {
    set(this, 'count', this.count + 1);
  }
  @action decrement() {
    set(this, 'count', this.count - 1);
  }
}
