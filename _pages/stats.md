---
permalink: /stats/
title: "Visitor Statistics"
excerpt: "Site traffic and visitor analytics"
author_profile: false
---

<style>
  .stats-hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5em;
    margin: 2em 0;
  }
  @media (max-width: 600px) {
    .stats-hero { grid-template-columns: 1fr; }
  }
  .stats-bignum {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 2em 1.5em;
    text-align: center;
  }
  .stats-bignum__value {
    font-size: 2.8em;
    font-weight: 800;
    color: #1a365d;
    line-height: 1;
  }
  .stats-bignum__label {
    font-size: 0.9em;
    color: #718096;
    margin-top: 0.6em;
    letter-spacing: 0.04em;
  }
  .stats-bignum__icon {
    font-size: 1.5em;
    color: #667eea;
    margin-bottom: 0.4em;
  }
  .stats-section {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 1.5em;
    margin-bottom: 1.5em;
    text-align: center;
  }
  .stats-section h3 {
    margin: 0 0 0.6em;
    font-size: 1em;
    color: #4a5568;
    font-weight: 600;
  }
  .stats-section p {
    color: #718096;
    font-size: 0.9em;
    line-height: 1.7;
  }
  .stats-section a {
    color: #667eea;
    font-weight: 600;
  }
</style>

<div class="stats-hero">
  <div class="stats-bignum">
    <div class="stats-bignum__icon"><i class="fas fa-users"></i></div>
    <div class="stats-bignum__value" id="busuanzi_value_site_uv">-</div>
    <div class="stats-bignum__label">TOTAL UNIQUE VISITORS</div>
    <div style="font-size:0.75em;color:#a0aec0;margin-top:0.4em;">
      <span id="busuanzi_container_site_uv">powered by busuanzi</span>
    </div>
  </div>
  <div class="stats-bignum">
    <div class="stats-bignum__icon"><i class="fas fa-eye"></i></div>
    <div class="stats-bignum__value" id="busuanzi_value_site_pv">-</div>
    <div class="stats-bignum__label">TOTAL PAGE VIEWS</div>
    <div style="font-size:0.75em;color:#a0aec0;margin-top:0.4em;">
      <span id="busuanzi_container_site_pv">powered by busuanzi</span>
    </div>
  </div>
</div>

<div class="stats-section">
  <h3><i class="fas fa-chart-bar"></i> Google Analytics</h3>
  <p>
    GA4 tracking (<code>G-L8ZEV312BH</code>) is active. Go to <a href="https://analytics.google.com/" target="_blank" rel="noopener">Google Analytics dashboard</a> for detailed reports:<br>
    <strong>Real-time</strong> users online &middot; <strong>Demographics</strong> (country, city) &middot; <strong>Acquisition</strong> (traffic sources) &middot; <strong>Behavior</strong> (pages, session time)
  </p>
</div>

<div class="stats-section">
  <h3><i class="fas fa-info-circle"></i> About This Page</h3>
  <p>
    <strong>Busuanzi (不蒜子)</strong> provides lightweight PV/UV counters — no registration, works globally.<br>
    <strong>Google Analytics 4</strong> provides full visitor demographics, traffic sources, and real-time monitoring.<br>
    Counters update automatically as visitors browse the site.
  </p>
</div>
