/*
 * Header menu collapse
 *
 * Minimal Mistakes ships a "greedy nav" that compares the width of the
 * visible link list against the nav container. That assumes the site title
 * lives inside the same list. The title now sits outside the list so the
 * links can be right-aligned, which breaks that measurement. Instead of
 * patching the heuristic, this uses an explicit breakpoint: below it the
 * links move into the drop-down, above it they are all shown.
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

  var BREAKPOINT = 640;

  function update() {
    // Reset: every link visible, drop-down closed.
    $hlinks.children().appendTo($vlinks);
    $hlinks.addClass('hidden');

    if (window.innerWidth < BREAKPOINT) {
      $vlinks.children().appendTo($hlinks);
      $btn.removeClass('hidden').attr('count', $hlinks.children().length);
    } else {
      $btn.addClass('hidden').attr('count', 0);
    }
  }

  // The theme's resize handler calls the global updateNav(), so replacing it
  // keeps a single source of truth.
  window.updateNav = update;

  $(update);
  $(window).on('resize load', update);
  $(window).on('load', function () {
    $btn.removeClass('close');
    $hlinks.addClass('hidden');
  });
})();
