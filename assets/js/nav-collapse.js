/*
 * Header menu collapse
 *
 * Minimal Mistakes ships a "greedy nav" that compares the width of the
 * visible link list against the nav container. That assumes the site title
 * lives inside the same list. Once the title is moved out (so the links can
 * be right-aligned), the calculation underestimates the space needed and the
 * menu overflows instead of collapsing. This file re-implements the check
 * with the title width taken into account and overrides the global
 * updateNav() the theme binds to resize events.
 */
(function () {
  var $ = window.jQuery;
  if (!$) {
    return;
  }

  var $nav = $('#site-nav');
  if (!$nav.length) {
    return;
  }

  var $btn = $nav.find('button');
  var $vlinks = $nav.find('.visible-links');
  var $hlinks = $nav.find('.hidden-links');
  var $title = $nav.find('.masthead__site-title');

  var GAP = 16;

  function update() {
    // Start from a clean state: every link visible, no drop-down button.
    $hlinks.children().appendTo($vlinks);
    $btn.addClass('hidden');
    $hlinks.addClass('hidden');

    var guard = $vlinks.children().length + 1;

    while (guard-- > 0) {
      var reserved = $title.outerWidth(true) + GAP;

      if (!$btn.hasClass('hidden')) {
        reserved += $btn.outerWidth(true) + GAP;
      }

      if ($vlinks.width() <= $nav.width() - reserved) {
        break;
      }

      if (!$vlinks.children().length) {
        break;
      }

      $vlinks.children().last().prependTo($hlinks);
      $btn.removeClass('hidden');
      $hlinks.removeClass('hidden');
    }

    $btn.attr('count', $hlinks.children().length);
  }

  // The theme's resize handler calls the global updateNav(), so replacing it
  // keeps a single source of truth.
  window.updateNav = update;

  $(update);
  $(window).on('load', update);
})();
