---
layout: paper
title: "Evolving Interdependent Operators with Large Language Models for Multi-Objective Combinatorial Optimization"
permalink: /e2oc/
date: 2026-05-01
venue: "International Conference on Machine Learning (ICML), 2026"
citation: "Junhao Qiu, Xin Chen, Liang Ge, Liyong Lin, Zhichao Lu, Qingfu Zhang. Evolving Interdependent Operators with Large Language Models for Multi-Objective Combinatorial Optimization. ICML, 2026."
category: conferences
authors: "Junhao Qiu, Xin Chen, Liang Ge, Liyong Lin, Zhichao Lu, Qingfu Zhang"
paperurl: "https://arxiv.org/abs/2601.17899"
codeurl: "https://github.com/jhqiu1/E2OC"
featured: true
header:
  teaser: "e2oc/figure_Com_pipeline_01.png"
---

<div class="paper-hero">
  <div class="paper-hero__badge"><i class="fas fa-trophy"></i> ICML 2026 &middot; May 1, 2026</div>
  <h1 class="paper-hero__title">Evolving Interdependent Operators with Large Language Models for Multi-Objective Combinatorial Optimization</h1>
  <p class="paper-hero__authors">
    <a href="https://jhqiu1.github.io" target="_blank" rel="noopener" class="paper-hero__author-link" title="Homepage"><strong>Junhao Qiu</strong></a>, <strong>Xin Chen</strong>, <strong>Liang Ge</strong>, <a href="https://scholar.google.com/citations?user=LMhx1sYAAAAJ&hl=en&oi=ao" target="_blank" rel="noopener" class="paper-hero__author-link" title="Homepage"><strong>Liyong Lin</strong></a><sup>*</sup>, <a href="https://www.cs.cityu.edu.hk/~zhichalu/index.html" target="_blank" rel="noopener" class="paper-hero__author-link" title="Homepage"><strong>Zhichao Lu</strong></a>, <a href="https://www.cs.cityu.edu.hk/~qzhan7/index.html" target="_blank" rel="noopener" class="paper-hero__author-link" title="Homepage"><strong>Qingfu Zhang</strong></a><sup>*</sup>
  </p>
  <p class="paper-hero__authors" style="font-size:0.85em; color:#7ba9cc;">
    City University of Hong Kong &middot; Contemporary Amperex Technology Limited (CATL)
  </p>
  <p class="paper-hero__contact">
    <i class="fas fa-envelope"></i> junhaoqiu2-c@my.cityu.edu.hk &nbsp;&middot;&nbsp; <sup>*</sup> Corresponding authors
  </p>
  <div class="paper-hero__logos">
    <a href="https://optima.cs.cityu.edu.hk/" target="_blank" rel="noopener"><img src="/images/e2oc/logo_opti.png" alt="OPTIMA Group" class="paper-hero__logo" loading="lazy"></a>
    <img src="/images/e2oc/logo_catl.png" alt="CATL" class="paper-hero__logo" loading="lazy">
  </div>
  <p class="paper-hero__venue">International Conference on Machine Learning (ICML), 2026</p>
  <div class="paper-hero__actions">
    <a href="#framework" class="paper-hero__btn paper-hero__btn--primary"><i class="fas fa-project-diagram"></i> Framework</a>
    <a href="https://arxiv.org/abs/2601.17899" class="paper-hero__btn paper-hero__btn--outline" target="_blank" rel="noopener"><i class="fas fa-file-alt"></i> arXiv Paper</a>
    <a href="https://github.com/jhqiu1/E2OC" class="paper-hero__btn paper-hero__btn--outline" target="_blank" rel="noopener"><i class="fab fa-github"></i> GitHub</a>
  </div>
</div>

<div class="paper-body">

  <div class="paper-section">
    <h2 class="paper-section__title">Abstract</h2>
    <div class="paper-abstract">
      <p>
        Neighborhood search operators are critical to the performance of Multi-Objective Evolutionary Algorithms (MOEAs), yet their design remains heavily reliant on domain expertise. While recent LLM-based Automated Heuristic Design (AHD) methods have made notable progress, they focus on optimizing individual operators <strong>independently</strong>, overlooking the <strong>dynamic coupling relationships</strong> between operators that collectively determine MOEA performance.
      </p>
      <p>
        We formulate multi-operator optimization in MOEAs as a <strong>Markov Decision Process (MDP)</strong>, enabling the improvement of interdependent operators through sequential decision-making. Building on this formulation, we propose <strong>E2OC</strong> (Evolution of Operator Combination), a framework that achieves the <strong>co-evolution of <em>design strategies</em> and executable <em>codes</em></strong>. E2OC employs <strong>Monte Carlo Tree Search</strong> to progressively explore combinations of operator design thoughts, coupled with an <strong>operator rotation mechanism</strong> to systematically identify effective operator configurations. The framework supports plug-and-play integration of mainstream AHD methods as the underlying operator designer.
      </p>
      <p>
        Comprehensive experiments on bi- and tri-objective FJSP and TSP demonstrate that E2OC consistently outperforms expert-designed operators by <strong>10%–22% in Hypervolume</strong>, surpasses all state-of-the-art AHD methods, and exhibits strong cross-problem generalization and <strong>sustained continuous optimization capability</strong>.
      </p>
    </div>
    <div class="paper-abstract-cn">
      邻域搜索算子是MOEA性能的关键，但其设计高度依赖专家经验。现有LLM-based AHD方法仅独立优化单个算子，忽视了算子间的动态耦合关系。本文将多算子优化形式化为<strong>MDP</strong>，提出<strong>E2OC</strong>框架，实现设计策略与可执行代码的<strong>协同进化</strong>。在双/三目标FJSP和TSP上，E2OC以<strong>10%–22%的HV提升</strong>超越专家设计，全面优于SOTA AHD方法，并展现出强大的跨问题泛化与持续优化能力。
    </div>
  </div>

  <div class="paper-section">
    <h2 class="paper-section__title">1. Problem &amp; Motivation</h2>
    <div class="paper-text">
      <p>
        Multi-Objective Combinatorial Optimization Problems (MCOPs) — such as production scheduling, vehicle routing, and engineering design — are NP-hard. MOEAs like NSGA-II, NSGA-III, and MOEA/D are the workhorse solvers, but their effectiveness hinges critically on the <strong>selection and interplay of domain-specific search operators</strong> (crossover, mutation, local search).
      </p>
      <p>
        <strong>The fundamental gap:</strong> In MOEAs, different operators act on overlapping or interacting decision subspaces. Modifying one operator changes the generation distribution and effectiveness of others — they may <strong>complement</strong> or <strong>conflict with</strong> each other. Designing operators independently systematically leads to suboptimal overall performance. However, both expert-driven and existing LLM-driven approaches lack mechanisms to reason about these <strong>inter-operator interactions and sequencing effects</strong>.
      </p>
    </div>
    <div class="paper-text-cn">
      多目标组合优化问题（生产调度、路径规划、工程设计等）多为NP-hard。MOEA的性能高度依赖邻域搜索算子的选择与配合。核心问题：MOEA中不同算子作用于相互耦合的决策子空间，修改一个算子会改变其他算子的生成分布与效果——它们可能互补也可能冲突。独立设计算子系统性导致全局次优。
    </div>

    <div class="paper-section__subtitle">Design Paradigms Compared</div>
    <div class="paper-figure paper-figure--constrained">
      <img src="/images/e2oc/figure_Com_pipeline_01.png" alt="Design Paradigm Comparison: Expert Design vs Single-Operator AHD vs E2OC Co-Design" loading="lazy">
      <p class="paper-figure__caption">Three design paradigms: Expert hand-crafted design → Single-operator AHD (independent optimization) → E2OC co-design (coupled optimization of interdependent operators).</p>
    </div>

    <table class="paper-compare-table">
      <tr><th>Paradigm</th><th>Limitation</th></tr>
      <tr><td>Expert Design</td><td>Costly, domain-specific, hard to generalize across problems</td></tr>
      <tr><td>Genetic Programming (GP)</td><td>Requires manually defined primitive/terminal sets; limited cross-domain transfer</td></tr>
      <tr><td>LLM Single-Operator AHD (EoH, FunSearch, MCTS-AHD, ReEvo)</td><td>Optimizes each operator <strong>in isolation</strong>; ignores coupling effects between operators</td></tr>
      <tr class="best"><td><strong>E2OC</strong> (Ours)</td><td><strong>Co-evolution of interdependent operators via MDP-guided MCTS search</strong></td></tr>
    </table>
  </div>

  <div class="paper-section">
    <h2 class="paper-section__title">2. MDP Formulation</h2>
    <div class="paper-text">
      <p>
        A <strong>key theoretical contribution</strong>: we formalize the multi-operator co-evolution process as a Markov Decision Process <code>(S, A, P, R)</code>:
      </p>
      <p>
        <strong>State</strong> — the current operator combination and associated prompt information: <code>s_t = (O₁, O₂, ..., O_K | P_t)</code>
      </p>
      <p>
        <strong>Action</strong> — select which operator <code>i</code> to evolve, and decide whether to rewrite its design prompt: <code>a_t = (i, w_i)</code>
      </p>
      <p>
        <strong>Reward</strong> — improvement in scalarized multi-objective performance: <code>R = F̄(d | O') − F̄(d | O)</code>, where <code>F̄</code> is the averaged Hypervolume over N independent evaluations.
      </p>
      <p>
        This formulation explicitly captures the <strong>dynamic, non-stationary nature</strong> of multi-operator evolution, since modifying one operator continuously reshapes the search landscape for others.
      </p>
    </div>
    <div class="paper-text-cn">
      关键理论贡献——将多算子协同进化形式化为MDP。状态为当前算子组合与提示信息，动作为选择算子并决定是否重写设计提示，奖励为多目标性能的标量化改进。该形式化显式捕捉了多算子进化的动态、非稳态特性。
    </div>
  </div>

  <div class="paper-section">
    <h2 class="paper-section__title">3. The E2OC Framework</h2>

    <div id="framework" class="paper-figure">
      <img src="/images/e2oc/figure_framwork_01.png" alt="E2OC Framework Overview" loading="lazy">
      <p class="paper-figure__caption">E2OC framework overview: Warm-Start → MCTS Strategy Search → Operator Rotation Evolution (the co-evolution loop of design strategies and executable code).</p>
    </div>

    <div class="paper-section__subtitle">Phase 1: Warm-Start — Building the Design Thought Space</div>
    <div class="paper-text">
      <p>
        Establish an initial high-quality <strong>language space of multi-domain design thoughts</strong> — semantic-level improvement suggestions extracted from independently evolved elite operators. Through independent operator evolution, design thought extraction, and language space construction, E2OC builds a structured semantic space capturing both internal (within-operator) and external (cross-operator) coupling relationships.
      </p>
    </div>
    <div class="paper-text-cn">
      建立高质量的跨域设计思想语言空间。通过独立算子进化、设计思想提取和语言空间构建，E2OC构造出捕捉算子内部拓扑关系和跨域耦合依赖的结构化语义空间。
    </div>
    <div class="paper-figure">
      <img src="/images/e2oc/figure_prompt_engineering_01.png" alt="Design Thought Extraction: Prompt Engineering Template" loading="lazy">
      <p class="paper-figure__caption">Structured prompt template for extracting design thoughts from independently evolved elite operators.</p>
    </div>

    <div class="paper-section__subtitle">Phase 2: Progressive Design Strategy Search via MCTS</div>
    <div class="paper-text">
      <p>
        MCTS explores <strong>combinations</strong> of design thoughts across different operators to identify the most promising <strong>design strategy</strong>: a tuple <code>(thought₁, thought₂, ..., thought_K)</code> that guides downstream code generation. Key insight: E2OC <strong>pre-constructs a fixed set of high-quality design thoughts per operator</strong> during warm-start, bounding the branching factor from unbounded to <code>O(AP^K)</code>, tractable for typical MOEA configurations (<code>K = 3~4, AP = 3</code>).
      </p>
      <p>
        Each MCTS iteration executes <strong>Selection → Expansion → Simulation → Backpropagation</strong>, with UCB-based node selection balancing exploration and exploitation. Counter-intuitively, <strong>bounding</strong> the search space improves performance by concentrating evaluation budget on a curated high-quality subspace.
      </p>
    </div>
    <div class="paper-text-cn">
      MCTS渐进式搜索设计思想的组合空间。关键设计：预热阶段为每个算子预构建高质量的固定设计思想集，将搜索复杂度从无界控制为O(AP^K)。反直觉的是，有界搜索空间反而优于无界动态生成——有限评估预算集中作用于高质量子空间。
    </div>
    <div class="paper-figure">
      <img src="/images/e2oc/figure_MCTS_variants_01.png" alt="MCTS Variant Architectures Compared" loading="lazy">
      <p class="paper-figure__caption">Four MCTS variant architectures: E2OC's bounded warm-start approach consistently outperforms unbounded dynamic generation variants. Counter-intuitively, bounding the search space improves performance by concentrating evaluation budget.</p>
    </div>

    <div class="paper-section__subtitle">Phase 3: Operator Rotation Evolution</div>
    <div class="paper-text">
      <p>
        Given a design strategy, an <strong>operator rotation mechanism</strong> generates actual executable operators and evaluates their collective performance. Each operator is evolved and evaluated <strong>in context</strong>, within the actual multi-operator system, rather than in isolation. The algorithm generator is <strong>pluggable</strong>, supporting integration of any state-of-the-art AHD method (EoH, FunSearch, MCTS-AHD, ReEvo) as the underlying designer.
      </p>
    </div>
    <div class="paper-text-cn">
      算子轮转机制在真实多算子系统上下文中评估每个算子的贡献。算法生成器可插拔，支持集成EoH、FunSearch、MCTS-AHD、ReEvo等主流AHD方法。
    </div>

  </div>

  <div class="paper-section">
    <h2 class="paper-section__title">4. Experimental Results</h2>

    <div class="paper-section__subtitle">Setup</div>
    <table class="paper-compare-table">
      <tr><th>Dimension</th><th>Configuration</th></tr>
      <tr><td>Problems</td><td>Bi-FJSP (Brandimarte mk01–mk15), Tri-FJSP, Bi-TSP (20/50/100 nodes), Tri-TSP</td></tr>
      <tr><td>MOEA Backbones</td><td>NSGA-II, NSGA-III, MOEA/D</td></tr>
      <tr><td>Operators Designed</td><td>FJSP: 4 operators; TSP: 3 operators</td></tr>
      <tr><td>LLM</td><td>DeepSeek-Chat (best quality-cost trade-off)</td></tr>
      <tr><td>Metrics</td><td>Hypervolume (HV↑), IGD↓, Relative Improvement (RI%)</td></tr>
      <tr><td>Eval Budget</td><td>~15,500 operator evaluations (fair comparison)</td></tr>
    </table>

    <div class="paper-section__subtitle">E2OC vs. Expert-Designed MOEAs</div>
    <div class="paper-text">
      <p>E2OC-designed operators, when plugged into standard MOEAs, <strong>consistently and significantly</strong> outperform expert-crafted operator combinations:</p>
    </div>
    <table class="paper-table">
      <tr><th>Problem</th><th>MOEA</th><th>HV Gain (RI%)</th></tr>
      <tr><td>Bi-FJSP</td><td>NSGA-II</td><td class="highlight">+22.00%</td></tr>
      <tr><td>Bi-FJSP</td><td>NSGA-III</td><td class="highlight">+13.27%</td></tr>
      <tr><td>Bi-FJSP</td><td>MOEA/D</td><td class="highlight">+21.78%</td></tr>
      <tr><td>Bi-TSP</td><td>NSGA-II</td><td class="highlight">+14.00%</td></tr>
      <tr><td>Bi-TSP</td><td>MOEA/D</td><td class="highlight">+16.92%</td></tr>
      <tr><td>Tri-FJSP</td><td>NSGA-II</td><td class="highlight">+17.36%</td></tr>
      <tr><td>Tri-FJSP</td><td>NSGA-III</td><td class="highlight">+17.24%</td></tr>
      <tr><td>Tri-TSP</td><td>NSGA-II</td><td class="highlight">+6.30%</td></tr>
    </table>
    <div class="paper-text-cn">
      关键发现：基准MOEA越弱，相对增益越大——E2OC通过卓越的算子设计有效补偿算法弱点。在Pareto前沿可视化上，E2OC算子实现了更大的解多样性和更优的收敛性。
    </div>
    <div class="paper-figure">
      <img src="/images/e2oc/e2oc-results-moeas_biobj.png" alt="E2OC vs Expert-Designed MOEAs on Bi-Objective Problems" loading="lazy">
      <p class="paper-figure__caption">E2OC vs. expert-designed MOEAs on <strong>bi-objective</strong> FJSP and TSP benchmarks.</p>
    </div>
    <div class="paper-figure">
      <img src="/images/e2oc/e2oc-results-moeas_triobj.png" alt="E2OC vs Expert-Designed MOEAs on Tri-Objective Problems" loading="lazy">
      <p class="paper-figure__caption">E2OC vs. expert-designed MOEAs on <strong>tri-objective</strong> FJSP and TSP benchmarks.</p>
    </div>

    <div class="paper-section__subtitle">E2OC vs. State-of-the-Art AHD Methods</div>
    <div class="paper-text">
      <p>All methods design operators for NSGA-II on Bi-FJSP with <strong>identical evaluation budgets (~15,500 evaluations)</strong>:</p>
    </div>
    <table class="paper-compare-table">
      <tr><th>Type</th><th>Method</th><th>HV (All instances)</th><th>IGD (All instances)</th></tr>
      <tr><td>Single</td><td>Random</td><td>0.2263</td><td>1.4193</td></tr>
      <tr><td>Single</td><td>FunSearch</td><td>0.2265</td><td>1.4070</td></tr>
      <tr><td>Single</td><td>EoH</td><td>0.2258</td><td>1.4352</td></tr>
      <tr><td>Single</td><td>ReEvo</td><td>0.2185</td><td>1.6551</td></tr>
      <tr><td>Single</td><td>MCTS-AHD</td><td>0.2269</td><td>1.3950</td></tr>
      <tr><td>Multi</td><td>CD (Coordinate Descent)</td><td>0.2170</td><td>1.6536</td></tr>
      <tr><td>Multi</td><td>UCB (Bandit)</td><td>0.2182</td><td>1.6300</td></tr>
      <tr><td>Multi</td><td>LLM-driven</td><td>0.2148</td><td>1.8772</td></tr>
      <tr><td>Multi</td><td>Win-UCB</td><td>0.2256</td><td>1.4619</td></tr>
      <tr class="best"><td><strong>Multi</strong></td><td><strong>E2OC</strong></td><td><strong>0.2435</strong></td><td><strong>1.1423</strong></td></tr>
    </table>
    <div class="paper-text-cn">
      单算子AHD方法无法弥补缺乏协同设计意识的不足。naively赋予协同设计能力反而降低性能——"如何"协调与"是否"协调同等重要。纯LLM驱动的算子选择表现最差——显式的搜索机制不可或缺。
    </div>
    <div class="paper-figure">
      <img src="/images/e2oc/e2oc-results-ahds.png" alt="E2OC vs State-of-the-Art AHD Methods" loading="lazy">
      <p class="paper-figure__caption">Comprehensive comparison against all state-of-the-art AHD methods under identical evaluation budget (~15,500 evaluations).</p>
    </div>

    <div class="paper-section__subtitle">Ablation Study</div>
    <table class="paper-table">
      <tr><th>Variant</th><th>What's Removed</th><th>HV (All)</th><th>&Delta;</th></tr>
      <tr class="best"><td><strong>E2OC</strong></td><td>(full model)</td><td><strong>0.2435</strong></td><td>&mdash;</td></tr>
      <tr><td>MCTS_OC</td><td>MCTS strategy search → fixed single strategy</td><td>0.2085</td><td>&minus;14.4%</td></tr>
      <tr><td>E2OC-SD</td><td>Operator rotation → sequential independent design</td><td>0.2187</td><td>&minus;10.2%</td></tr>
    </table>
    <div class="paper-text">
      <p><strong>Each core component is indispensable.</strong> Removing progressive strategy search causes the largest degradation. E2OC amplifies the capability of any underlying AHD designer: E2OC[EoH] = 0.2435, E2OC[FunSearch] = 0.2264, E2OC[MCTS-AHD] = 0.2269.</p>
    </div>
    <div class="paper-figure">
      <img src="/images/e2oc/e2oc-results-mcts.png" alt="MCTS Ablation and Variant Analysis" loading="lazy">
      <p class="paper-figure__caption">MCTS component ablation: each core component (strategy search, operator rotation) is indispensable. E2OC amplifies any underlying AHD designer.</p>
    </div>

    <div class="paper-section__subtitle">Generalization &amp; Continuous Optimization</div>
    <div class="paper-text">
      <p>
        <strong>Cross-scale:</strong> Operators trained on TSP-100 generalize to TSP-150 (<strong>+30.93% HV</strong>) and TSP-200 (<strong>+22.06% HV</strong>).<br>
        <strong>Continuous optimization:</strong> E2OC can bootstrap itself: Round 1 → HV=0.2435, Round 2 → 0.2454 (+0.8%), Round 3 → 0.2475 (+1.6%). Not trapped in local optima.<br>
        <strong>Cost:</strong> <strong>$1.14 per design task</strong> with DeepSeek-Chat, making automated operator design economically viable for real-world applications.
      </p>
    </div>
    <div class="paper-figure">
      <img src="/images/e2oc/figure_convergence_ana_01.png" alt="Convergence and Generalization Analysis" loading="lazy">
      <p class="paper-figure__caption">Convergence analysis: E2OC sustains continuous optimization across rounds (Round 1 → 2 → 3). Cross-scale generalization: operators trained on TSP-100 transfer to larger instances (TSP-150, TSP-200) with strong HV gains.</p>
    </div>
  </div>

  <div class="paper-section">
    <h2 class="paper-section__title">5. Design Philosophy</h2>

    <div class="paper-philosophy">
      <div class="paper-philosophy__title"><i class="fas fa-lightbulb"></i> Semantic-Level Search &gt; Code-Level Search</div>
      <div class="paper-philosophy__text">Traditional AHD mutates code syntax; E2OC searches in the space of <strong>design intents</strong>. A design thought constrains code generation toward a meaningful direction, dramatically improving sample efficiency.</div>
      <div class="paper-philosophy__cn">传统AHD在代码语法层变异；E2OC在设计意图层搜索，大幅提升采样效率。</div>
    </div>

    <div class="paper-philosophy">
      <div class="paper-philosophy__title"><i class="fas fa-lightbulb"></i> Bounded Space &gt; Unbounded Space</div>
      <div class="paper-philosophy__text">In LLM-based search, <strong>more is not always better</strong>. E2OC's warm-start curation concentrates the budget where it matters most. The continuous optimization loop provides a principled escape mechanism.</div>
      <div class="paper-philosophy__cn">有界搜索空间反直觉地优于无界空间——有限预算集中作用于高质量子空间。</div>
    </div>

    <div class="paper-philosophy">
      <div class="paper-philosophy__title"><i class="fas fa-lightbulb"></i> Co-Design Reveals Functional Complementarity</div>
      <div class="paper-philosophy__text">Evolved operators spontaneously develop a clear <strong>division of labor</strong>: one specializes in adaptive machine assignment while minimizing sequence perturbation. This complementarity <strong>emerges</strong> from the co-design process and cannot be achieved by independent optimization.</div>
      <div class="paper-philosophy__cn">进化出的算子自发形成功能分工——这种互补性从协同设计过程中涌现，独立优化无法实现。</div>
    </div>
  </div>

  <div class="paper-section">
    <h2 class="paper-section__title">BibTeX</h2>
    <div class="paper-bibtex">
@inproceedings{qiu2026e2oc,
  title     = {Evolving Interdependent Operators with Large
               Language Models for Multi-Objective
               Combinatorial Optimization},
  author    = {Qiu, Junhao and Chen, Xin and Ge, Liang and
               Lin, Liyong and Lu, Zhichao and Zhang, Qingfu},
  booktitle = {Proceedings of the International Conference on Machine Learning},
  year      = {2026},
  note      = {arXiv:2601.17899}
}
    </div>
  </div>

</div>
