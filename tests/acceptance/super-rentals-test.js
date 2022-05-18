import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | super rentals', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    // Navigate to / URL (http://localhost:4200/) of the app
    // The page takes time to load - so is an async step
    // So use the await keyword, so we wait until page is loaded
    // before moving on.
    await visit('/');

    // Other simulated interaction (click on buttons/links, etc.) require
    // await keyword as well, as they take time to complete.

    // Check that the current URL matches expected URL
    assert.strictEqual(currentURL(), '/');
    // Confirm that the nav element belonging to NavBar component exists
    assert.dom('nav').exists();
    assert.dom('h1').hasText('SuperRentals');
    // Confirm that we have a h2 tag containing specified text
    // Use this to know that we have rendered the correct template
    // without errors
    assert.dom('h2').hasText('Welcome to Super Rentals!');
    // Look for the link with specified text using a CSS Selector
    // "Look inside tag with the jumbo class for an anchor with
    // the button class"
    assert.dom('.jumbo a.button').hasText('About Us');
    // We have confirmed that the link exists, so click on it
    await click('.jumbo a.button');
    // Assert that clicking on the link brings us to the about url.
    assert.strictEqual(currentURL(), '/about');
  });

  test('visiting ./about', async function (assert) {
    // Visit the about page
    await visit('/about');
    // Make sure that we actually landed on the about page
    assert.strictEqual(currentURL(), '/about');
    // Confirm that the nav element belonging to NavBar component exists
    assert.dom('nav').exists();
    assert.dom('h1').hasText('SuperRentals');
    // Make sure the about page has loaded
    assert.dom('h2').hasText('About Super Rentals');
    // Check that there is a Contact Us button
    assert.dom('.jumbo a.button').hasText('Contact Us');
    // Click the Contact Us button
    await click('.jumbo a.button');
    // Make sure we got to the Contact Us page
    assert.strictEqual(currentURL(), '/getting-in-touch');
  });

  test('visiting /getting-in-touch', async function (assert) {
    // Visit the contact us page
    await visit('/getting-in-touch');
    // Check that we landed on the contact us page
    assert.strictEqual(currentURL(), '/getting-in-touch');
    // Confirm that the nav element belonging to NavBar component exists
    assert.dom('nav').exists();
    assert.dom('h1').hasText('SuperRentals');
    // check that it loaded
    assert.dom('h2').hasText('Contact Us');
    // Look for the About Us button
    assert.dom('.jumbo a.button').hasText('About Us');
    // click the about us button
    await click('.jumbo a.button');
    // make sure we got to the about us page
    assert.strictEqual(currentURL(), '/about');
  });

  test('navigating using the nav-bar', async function (assert) {
    await visit('/');
    assert.dom('nav').exists();
    assert.dom('nav a.menu-index').hasText('SuperRentals');
    assert.dom('nav a.menu-contact').hasText('Contact');
    assert.dom('nav a.menu-about').hasText('About');

    await click('nav a.menu-about');
    assert.strictEqual(currentURL(), '/about');

    await click('nav a.menu-contact');
    assert.strictEqual(currentURL(), '/getting-in-touch');

    await click('nav a.menu-index');
    assert.strictEqual(currentURL(), '/');
  });
});
