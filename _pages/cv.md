---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* Ph.D. in Computer Science, City University of Hong Kong, 2026 - present
* M.S. in Industrial Engineering, Guangdong University of Technology, 2022 - 2025
* B.S. in Industrial Engineering, Guangdong University of Technology, 2018 - 2022

Research Interests
======
* Intelligent Manufacturing Systems
* Multi-objective Optimization
* Neural Combinatorial Optimization
* Artificial Intelligence

Work experience
======
* 2025.07 - 2025.12: Research Assistant
  * City University of Hong Kong
  * Department of Computer Science, Optima Group

Skills
======
* Programming: Python
* Frameworks: Reinforcement Learning, Deep Learning
* Optimization: Multi-objective Optimization, Combinatorial Optimization
* Tools: Jekyll, Git, LaTeX

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html %}
  {% endfor %}</ul>

Teaching
======
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

Service and Leadership
======
* Reviewer: AAAI, International Journal of Production Research, The Journal of Supercomputing
* National Scholarship 2023, 2024
* Outstanding Graduate of Guangdong University of Technology, 2022 & 2025
