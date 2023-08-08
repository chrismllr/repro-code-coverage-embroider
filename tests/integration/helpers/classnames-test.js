import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';

import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Helper | classnames', function (hooks) {
  setupRenderingTest(hooks);

  test('[positional[0]] renders classes based on hash of CLASS:BOOLEAN', async function (assert) {
    this.set('classHash', {
      btn: true,
      'btn-secondary': true,
      'btn-outline': false,
    });

    await render(
      hbs`
        <button class={{classnames this.classHash}} type='button'>
          Button!
        </button>
      `
    );

    assert.dom('button').hasClass('btn');
    assert.dom('button').hasClass('btn-secondary');
    assert.dom('button').doesNotHaveClass('btn-outline');

    this.set('classHash', {
      btn: true,
      'btn-secondary': false,
      'btn-outline': false,
    });

    assert.dom('button').hasClass('btn');
    assert.dom('button').doesNotHaveClass('btn-secondary');
    assert.dom('button').doesNotHaveClass('btn-outline');
  });

  test('[named hash] renders classes based on hash of CLASS:BOOLEAN', async function (assert) {
    this.set('btnSecondary', false);
    await render(
      hbs`
        <button class={{classnames btn=true btn-secondary=this.btnSecondary btn-outline=false}} type='button'>
          Button!
        </button>
      `
    );

    assert.dom('button').hasClass('btn');
    assert.dom('button').doesNotHaveClass('btn-secondary');
    assert.dom('button').doesNotHaveClass('btn-outline');

    this.set('btnSecondary', true);

    assert.dom('button').hasClass('btn');
    assert.dom('button').hasClass('btn-secondary');
    assert.dom('button').doesNotHaveClass('btn-outline');
  });
});
