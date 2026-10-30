---
layout: paper
title: "EvoDR: Evolving Dispatching Rules via Large Language Model for Dynamic Flexible Assembly Flow Shop Scheduling"
permalink: /evodr/
date: 2026-10-30
venue: "IEEE Transactions on Evolutionary Computation (TEVC), 2026"
citation: "Junhao Qiu, Haoyang Zhuang, Fei Liu, Jianjun Liu, Qingfu Zhang. EvoDR: Evolving Dispatching Rules via Large Language Model for Dynamic Flexible Assembly Flow Shop Scheduling. IEEE Transactions on Evolutionary Computation, 2026."
category: manuscripts
authors: "Junhao Qiu, Haoyang Zhuang, Fei Liu, Jianjun Liu, Qingfu Zhang"
paperurl: "https://arxiv.org/abs/2601.15738"
codeurl: "https://github.com/jhqiu1/EvoDR"
featured: true
header:
  teaser: "evodr/figure_framework.png"
---

<div class="paper-hero">
  <div class="paper-hero__badge"><i class="fas fa-book"></i> IEEE TEVC &middot; 2026</div>
  <h1 class="paper-hero__title">EvoDR: Evolving Dispatching Rules via Large Language Model for Dynamic Flexible Assembly Flow Shop Scheduling</h1>
  <p class="paper-hero__authors">
    <a href="https://jhqiu1.github.io" target="_blank" rel="noopener" class="paper-hero__author-link" title="Homepage"><strong>Junhao Qiu</strong></a><sup>1</sup>, <strong>Haoyang Zhuang</strong><sup>2</sup>, <a href="https://feiliu36.github.io" target="_blank" rel="noopener" class="paper-hero__author-link" title="Homepage"><strong>Fei Liu</strong></a><sup>1</sup>, <a href="https://jdgcxy.gdut.edu.cn/info/1099/2006.htm" target="_blank" rel="noopener" class="paper-hero__author-link" title="Homepage"><strong>Jianjun Liu</strong></a><sup>2</sup>, <a href="https://www.cs.cityu.edu.hk/~qzhan7/index.html" target="_blank" rel="noopener" class="paper-hero__author-link" title="Homepage"><strong>Qingfu Zhang</strong></a><sup>1,*</sup>
  </p>
  <p class="paper-hero__authors" style="font-size:0.85em; color:#7ba9cc;">
    <sup>1</sup> City University of Hong Kong &nbsp;&middot;&nbsp; <sup>2</sup> Guangdong University of Technology
  </p>
  <p class="paper-hero__contact">
    <i class="fas fa-envelope"></i> junhaoqiu2-c@my.cityu.edu.hk &nbsp;&middot;&nbsp; <sup>*</sup> Corresponding author
  </p>
  <p class="paper-hero__venue">IEEE Transactions on Evolutionary Computation (TEVC), 2026</p>
  <div class="paper-hero__actions">
    <a href="#framework" class="paper-hero__btn paper-hero__btn--primary"><i class="fas fa-project-diagram"></i> Framework</a>
    <a href="https://arxiv.org/abs/2601.15738" class="paper-hero__btn paper-hero__btn--outline" target="_blank" rel="noopener"><i class="fas fa-file-alt"></i> arXiv Paper</a>
    <a href="https://github.com/jhqiu1/EvoDR" class="paper-hero__btn paper-hero__btn--outline" target="_blank" rel="noopener"><i class="fab fa-github"></i> GitHub</a>
  </div>
</div>

<div class="paper-body">

  <div class="paper-section">
    <h2 class="paper-section__title">Abstract</h2>
    <div class="paper-abstract">
      <p>
        Dynamic flexible assembly flow shop scheduling with multi-product delivery is a critical combinatorial problem, characterized by <strong>kitting supply</strong> and <strong>machine flexibility</strong>. Genetic programming (GP) is widely used to automatically generate dispatching rules, enabling responsive scheduling that reduces manual effort while meeting high responsiveness demands. However, GP methods depend on <strong>fixed terminal sets</strong> and have <strong>weak interpretability</strong>.
      </p>
      <p>
        We develop <strong>EvoDR</strong>, an evolving dispatching rules framework that leverages the semantic understanding and generation capabilities of large language models to achieve cross-domain integration of algorithm design and scheduling knowledge. Multi-stage assembly supply decisions are modeled as <strong>priority sorting of directed edges on heterogeneous graphs</strong>. A <strong>dual-expert co-evolution</strong> mechanism is implemented, where <strong>LLM-A</strong> generates code while <strong>LLM-S</strong> conducts scheduling analysis and reflection. Guided by improvements in hybrid evaluation, adaptive rules that fit dynamic features are continuously evolved.
      </p>
      <p>
        Experimental results show that EvoDR achieves lower average tardiness than state-of-the-art approaches. In <strong>24 scenarios with different resource configurations and disturbance levels, totaling 480 instances</strong>, it consistently outperforms expert-designed competitors, demonstrating superior robustness.
      </p>
    </div>
    <div class="paper-abstract-cn">
      动态柔性装配流水车间调度（FAFSP）以装配物料结构配套与机器柔性为主要特征。GP 能自动生成调度规则，但依赖固定终结符集、可解释性弱。本文提出 <strong>EvoDR</strong>：把多阶段装配供应决策建模为异构图上<strong>有向边的优先级排序</strong>，并以<strong>双专家协同进化</strong>机制驱动规则演化——<strong>LLM-A</strong> 负责生成可执行代码，<strong>LLM-S</strong> 负责调度语义分析与反思。在 24 个场景、480 个实例上，EvoDR 的平均拖期优于现有 AHD 方法与专家手工规则。
    </div>
  </div>

  <div class="paper-section">
    <h2 class="paper-section__title">1. Problem &amp; Motivation</h2>
    <div class="paper-text">
      <p>
        In a flexible assembly flow shop, parts are processed first and then assembled into products, and a product can only be delivered once its <strong>entire item set</strong> is complete (<em>dual kitting</em>: structure-level kitting for assembly, delivery-level kitting for the product set). Under dynamic order arrivals, processing and assembly decisions happen <strong>asynchronously</strong>: processing wants low changeover loss and complete kits, while assembly wants to coordinate different products of the same order for consolidated delivery.
      </p>
      <p>
        <strong>The gap.</strong> Priority dispatching rules (PDRs) are the standard real-time remedy, but designing them is expert-intensive. GP-based hyper-heuristics automate the search yet rely on a <strong>predefined terminal set</strong>, which implicitly encodes problem-specific knowledge and limits both transferability and interpretability. Existing LLM-based automated heuristic design (AHD) methods evolve rules on the code level, without an explicit notion of the <strong>multi-stage, hierarchical decision structure</strong> of the assembly supply chain.
      </p>
    </div>
    <div class="paper-text-cn">
      柔性装配流水车间中，零件先加工再装配，整单产品集齐才能交付（结构级配齐 + 交付级配齐，即双 kitting 约束）。订单动态到达时，加工与装配决策异步发生：加工侧追求换型损失小、配套完整，装配侧追求同订单多产品协同交付。PDR 是实时调度的常用手段，但设计依赖专家；GP 类超启发式依赖固定终结符集，隐含注入问题知识，可解释性与迁移性受限。现有 LLM-AHD 方法在代码层进化规则，缺少对多阶段层级决策结构的显式建模。
    </div>

    <div class="paper-figure">
      <img src="/images/evodr/figure_framework.png" alt="EvoDR Framework Overview" loading="lazy">
      <p class="paper-figure__caption">EvoDR overview: dynamic order arrivals flow through the job buffer into a heterogeneous-graph decision model, are dispatched by an evolved PDR on event-triggered <em>(j, m)</em> arc ranking, and the rule itself is improved by an Initialization → Evaluation → Evolution loop.</p>
    </div>

    <table class="paper-compare-table">
      <tr><th>Paradigm</th><th>Limitation</th></tr>
      <tr><td>Manual PDR design (EDD, FIFO, MWKR, ...)</td><td>Expert-intensive; single rules react poorly to changing load and disturbance levels</td></tr>
      <tr><td>Genetic Programming / GEP</td><td>Fixed terminal set; problem knowledge baked into the search space; weak interpretability</td></tr>
      <tr><td>LLM single-rule AHD (EoH, FunSearch, MCTS-AHD, ReEvo)</td><td>Code-level evolution only; no explicit model of multi-stage assembly supply or of scheduling semantics</td></tr>
      <tr class="best"><td><strong>EvoDR</strong> (Ours)</td><td><strong>Heterogeneous-graph MDP + dual-expert co-evolution of rules and design knowledge</strong></td></tr>
    </table>
  </div>

  <div class="paper-section">
    <h2 class="paper-section__title">2. Problem Modeling: Heterogeneous Graph and MDP</h2>
    <div class="paper-text">
      <p>
        Processing jobs, assembly jobs and delivery requests are treated as nodes of a <strong>heterogeneous graph</strong>, with precedence, kitting and product-set relations as typed edges. At each event-triggered decision step <code>t</code>, the system ranks feasible <strong>(job, machine) arcs</strong> — i.e., joint machine assignment and job sequencing — rather than ranking jobs and machines separately. This avoids the <strong>decision-preference inconsistency</strong> between the processing stage (efficiency, complete kits) and the assembly stage (product-set coordination), where hand-crafted rule combinations tend to fail.
      </p>
      <p>
        The dynamic problem is then cast as an <strong>MDP</strong> over this graph, where the state is the current shop-floor state plus the dynamic feature vector, the action is the selected arc, and the reward is derived from order tardiness, so that the dispatching rule is a policy defined on the graph rather than a fixed priority formula.
      </p>
    </div>
    <div class="paper-text-cn">
      将加工任务、装配任务与交付请求建模为异构图的节点，前置约束、配套约束、产品集约束作为类型化边。每次事件触发的决策步不是分别给工件和机器打分，而是对可行 <strong>(工件, 机器) 弧</strong>排序，避免了加工阶段（效率、配套）与装配阶段（产品集协同）之间的决策偏好冲突，手工规则组合往往就失效在这一步。整个动态问题随后被形式化为该图上的 MDP，调度规则即为图上的策略。
    </div>
  </div>

  <div class="paper-section">
    <h2 class="paper-section__title">3. The EvoDR Framework</h2>

    <div id="framework" class="paper-figure">
      <img src="/images/evodr/figure_iteration_process.png" alt="EvoDR Evolution Loop" loading="lazy">
      <p class="paper-figure__caption">One iteration of EvoDR: elite-knowledge-guided initialization → hybrid evaluation (objective fitness + LLM-S semantic feedback) → feature-fitting rule evolution through four operators (C1, C2, M1, M2).</p>
    </div>

    <div class="paper-section__subtitle">Phase 1: Individual Encoding</div>
    <div class="paper-text">
      <p>
        Each individual carries four fields: a <strong>textual description</strong> of the design idea, an executable <strong>code block</strong> (a <code>cal_priority</code> function with a fixed interface), the <strong>objective fitness</strong> <code>c<sup>s</sup></code> measured by simulation on multiple instances, and the <strong>semantic evaluation</strong> <code>c<sup>e</sup></code> produced by LLM-S. Evolving the description together with the code keeps the search at the design level instead of drifting into syntax mutation.
      </p>
    </div>
    <div class="paper-text-cn">
      每个个体包含四部分：设计思想文本描述、可执行代码块（固定接口的 cal_priority 函数）、模拟器测得的目标适应度 c^s、以及 LLM-S 给出的语义评价 c^e。描述与代码同步进化，使搜索停留在设计层而非语法变异层。
    </div>

    <div class="paper-section__subtitle">Phase 2: Elite-Knowledge-Guided Initialization</div>
    <div class="paper-text">
      <p>
        Instead of a random initial population, an elite rule is executed in the simulator, LLM-S analyses its behaviour and produces improvement suggestions, and LLM-A expands this into a <strong>structurally diverse initial population</strong>. Sampling temperatures are spread over a range so that early individuals stay conservative while later ones add diversity; the temperature of the best individual found during initialization is recorded and reused as the evolution temperature <code>u<sub>0</sub></code>.
      </p>
    </div>
    <div class="paper-text-cn">
      初始种群不用随机生成：先在模拟器上跑一条精英规则，由 LLM-S 分析其行为并给出改进建议，再由 LLM-A 扩展出结构多样的初始种群。采样温度在区间内均匀铺开（前期保守、后期增强多样性），初始化阶段最优个体对应的温度被记录下来，作为后续进化温度 u₀。
    </div>

    <div class="paper-section__subtitle">Phase 3: Hybrid Evaluation</div>
    <div class="paper-text">
      <p>
        Two independent channels. The <strong>objective channel</strong> computes fitness in the simulator and is the <em>only</em> basis for updating the incumbent, parent selection and survival selection. The <strong>semantic channel</strong> (LLM-S) returns a structured report — advantages, limitations, actionable suggestions — that is injected into the generation prompt but <em>never</em> into fitness or selection. Semantic feedback therefore affects the search direction only, not how rules are ranked.
      </p>
    </div>
    <div class="paper-text-cn">
      两条独立通道：目标通道在模拟器中算适应度，是更新当前最优、选择父代、生存选择的唯一依据；语义通道由 LLM-S 输出结构化报告（优势、局限、可执行建议），只注入生成提示，不参与适应度和选择计算。语义反馈因此只影响搜索方向，不改变规则排序。
    </div>

    <div class="paper-section__subtitle">Phase 4: Feature-Fitting Rule Evolution</div>
    <div class="paper-text">
      <p>
        Four operators are implemented purely by prompt manipulation, so the evolutionary operators themselves are language-level and need no problem-specific primitive set:
      </p>
    </div>

    <table class="paper-compare-table">
      <tr><th>Operator</th><th>Mechanism</th><th>Role</th></tr>
      <tr><td><strong>C1: Dominance-Fusion Crossover</strong></td><td>Two parents + "combine the advantages of the two"</td><td>Merge structural strengths into a stronger offspring</td></tr>
      <tr><td><strong>C2: Exploratory Crossover</strong></td><td>Parent code + "create a completely different algorithm"</td><td>Break premature convergence, escape local optima</td></tr>
      <tr><td><strong>M1: Directed Optimization</strong></td><td>Parent code + LLM-S suggestion <code>c<sup>e</sup></code></td><td>Turn natural-language suggestions into code-level refinement</td></tr>
      <tr><td><strong>M2: Parameter Tuning</strong></td><td>Parent code + "identify parameters, change their settings"</td><td>Numerical refinement inside an existing logic structure</td></tr>
    </table>

    <div class="paper-figure paper-figure--constrained">
      <img src="/images/evodr/figure_prompt_struct.png" alt="Prompt Structure of LLM-A and LLM-S" loading="lazy">
      <p class="paper-figure__caption">Two prompt templates: <code>p<sup>S</sup></code> feeds code, fitness and dynamic features to LLM-S along with the best/worst rules of the population; <code>p<sup>A</sup></code> combines the semantic feedback <code>c<sup>e</sup></code> with an operator instruction to drive LLM-A.</p>
    </div>
    <div class="paper-text-cn">
      四个算子都只靠修改提示实现，本身不需要任何问题相关的原语集合。C1 融合双亲优势；C2 强制生成形态完全不同的规则以跳出局部最优；M1 把 LLM-S 的自然语言建议翻译成代码层改进；M2 只调参数不改结构。p^S 会把种群中最好和最差的规则一并交给 LLM-S，使其给出相对性判断而非孤立打分。
    </div>
  </div>

  <div class="paper-section">
    <h2 class="paper-section__title">4. Experimental Results</h2>

    <div class="paper-section__subtitle">Setup</div>
    <table class="paper-compare-table">
      <tr><th>Dimension</th><th>Configuration</th></tr>
      <tr><td>Instances</td><td>Real industrial data from a Chinese home-appliance manufacturer + generated instances (Poisson order arrivals, exponential inter-arrival time under load)</td></tr>
      <tr><td>Scale factors</td><td>Machine configuration <code>m</code> (3×6 / 5×12), flexibility <code>&phi;</code> (0.5 / 0.7), arriving orders <code>&alpha;</code> (20 / 50), load factor <code>&mu;</code> (1 / 2 / 4)</td></tr>
      <tr><td>Baselines</td><td>EDD; 8 hybrid heuristics (FIFO / MOPNR / LWKR / MWKR × SPT / EET); GP; GEP; RandSample; FunSearch; EoH; MCTS-AHD; ReEvo</td></tr>
      <tr><td>Metric</td><td>Average tardiness (lower is better), ARI = (T<sub>max</sub> &minus; T<sub>current</sub>) / T<sub>max</sub></td></tr>
      <tr><td>LLM</td><td>GPT-4o-mini (96.0% code accuracy, $0.09 per run) after comparing 5 models</td></tr>
      <tr><td>Budget</td><td>20 iterations, population 4–6; 200 samples for AHD comparison; decision time is millisecond-level</td></tr>
    </table>

    <div class="paper-section__subtitle">EvoDR vs. State-of-the-Art AHD Methods</div>
    <div class="paper-text">
      <p>
        On 20 instances with real industrial characteristics (10 train / 10 test), all AHD methods are compared under the same <strong>200-sample budget</strong> and identical dynamic features:
      </p>
    </div>
    <table class="paper-table">
      <tr><th>Method</th><th>Type</th><th>All (Avg. tardiness)</th><th>ARI &uarr;</th><th>Avg. Rank</th></tr>
      <tr><td>EDD</td><td>Manual</td><td>6957.34</td><td>0.00%</td><td>7.85</td></tr>
      <tr><td>GP</td><td>Traditional AHD</td><td>6229.43</td><td>10.46%</td><td>5.00</td></tr>
      <tr><td>GEP</td><td>Traditional AHD</td><td>6649.56</td><td>4.42%</td><td>6.35</td></tr>
      <tr><td>RandSample</td><td>LLM</td><td>6009.91</td><td>13.62%</td><td>4.25</td></tr>
      <tr><td>FunSearch</td><td>LLM</td><td>6008.46</td><td>13.64%</td><td>3.90</td></tr>
      <tr><td>EoH</td><td>LLM</td><td>6074.44</td><td>12.69%</td><td>3.35</td></tr>
      <tr><td>MCTS-AHD</td><td>LLM</td><td>6206.53</td><td>10.79%</td><td>4.95</td></tr>
      <tr><td>ReEvo</td><td>LLM</td><td>6238.49</td><td>10.33%</td><td>5.55</td></tr>
      <tr class="best"><td><strong>EvoDR</strong></td><td><strong>LLM + dual expert</strong></td><td><strong>5788.11</strong></td><td><strong>16.81%</strong></td><td><strong>2.65</strong></td></tr>
    </table>
    <div class="paper-text">
      <p>
        On the <strong>test</strong> split the gain is larger (ARI <strong>18.63%</strong>), while GP degrades markedly on test instances — the fixed terminal set helps it fit the training set but does not transfer. Friedman test over the 20 instances rejects equality of methods (<code>p &lt; 0.0001</code>); two-tailed Wilcoxon signed-rank tests put EvoDR ahead of every competitor (all <code>p &le; 0.0025</code>, below the Bonferroni threshold 0.0071), winning 62–82 of 100 paired runs. Note that EvoDR is <em>not</em> the best method on every single instance — its advantage appears in the aggregate and in rank.
      </p>
    </div>
    <div class="paper-text-cn">
      测试集上增益更大（ARI 18.63%），而 GP 在测试集上明显退化——固定终结符集利于拟合训练集，但迁移性差。Friedman 检验拒绝各方法性能相同（p < 0.0001）；Wilcoxon 符号秩检验显示 EvoDR 显著优于所有对比方法（p ≤ 0.0025，低于 Bonferroni 阈值 0.0071），在 100 组配对中赢 62–82 组。需要说明：EvoDR 并非在每个单实例上都最优，优势体现在整体均值与平均排名上。
    </div>

    <div class="paper-figure paper-figure--constrained">
      <img src="/images/evodr/figure_boxplot_AHDs.png" alt="Box Plot of Tardiness across AHD Methods" loading="lazy">
      <p class="paper-figure__caption">Tardiness distribution of the best PDR found by each method (5 independent design runs). Red markers: mean; black lines: median.</p>
    </div>

    <div class="paper-figure paper-figure--constrained">
      <img src="/images/evodr/figure_convergence_AHDs.png" alt="Convergence of Different AHD Methods" loading="lazy">
      <p class="paper-figure__caption">Convergence under a 200-sample budget. GP finds a good rule within ~70 samples but plateaus; EvoDR starts weaker and keeps improving after 100 samples, overtaking the incumbent eight times.</p>
    </div>

    <div class="paper-figure">
      <img src="/images/evodr/figure_convergence_analys.png" alt="Convergence Analysis of a Single Design Run" loading="lazy">
      <p class="paper-figure__caption">A single design run: beyond the 150th sample — where GP-style methods have already plateaued — the curve shows a second convergence phase (7581.21 → 7371.61), driven by LLM-S pointing to feature-level fixes such as adding a historical-performance factor or predictive processing times.</p>
    </div>

    <div class="paper-section__subtitle">Robustness across 24 Operating Scenarios</div>
    <div class="paper-text">
      <p>
        480 instances over 24 scenarios are constructed by varying machine configuration, flexibility, arriving-order volume and load factor. EvoDR is re-designed and re-tested independently for each scenario:
      </p>
    </div>
    <table class="paper-table">
      <tr><th>Condition (<code>m</code>-<code>&phi;</code>-<code>&alpha;</code>-<code>&mu;</code>)</th><th>EDD</th><th>FIFO+SPT</th><th>MWKR+EET</th><th>EvoDR</th></tr>
      <tr><td>3-6-0.5-20-1</td><td>1710.45</td><td>1729.20</td><td>2091.60</td><td class="highlight">1117.80</td></tr>
      <tr><td>3-6-0.5-50-4</td><td>30322.88</td><td>30122.07</td><td>37470.92</td><td class="highlight">25278.60</td></tr>
      <tr><td>3-6-0.7-50-4</td><td>31499.53</td><td>32061.02</td><td>35879.24</td><td class="highlight">22108.98</td></tr>
      <tr><td>5-12-0.5-50-1</td><td>2353.79</td><td>449.26</td><td>1676.96</td><td class="highlight">409.58</td></tr>
      <tr><td>5-12-0.7-20-1</td><td>975.55</td><td>134.31</td><td>705.70</td><td>129.94</td></tr>
      <tr><td>5-12-0.7-50-4</td><td>6207.29</td><td>4818.25</td><td>5996.55</td><td class="highlight">4553.07</td></tr>
      <tr class="best"><td><strong>Average (24 scenarios)</strong></td><td>7470.74</td><td>6483.53</td><td>7943.18</td><td><strong>5387.17</strong></td></tr>
      <tr><td><strong>ARI &uarr;</strong></td><td>10.72%</td><td>22.51%</td><td>5.07%</td><td class="highlight"><strong>35.62%</strong></td></tr>
    </table>
    <div class="paper-text">
      <p>
        EvoDR attains the lowest tardiness in <strong>19 of the 24 scenarios</strong> and the lowest average overall (ARI 35.62%). The remaining cases are mostly low-load settings where a single hybrid rule is already near-optimal, e.g. 5-12-0.7-20-1, where FIFO+SPT reaches 134.31 against EvoDR's 129.94. The gap widens as load increases: under 3-6-0.7-50-4 the best hybrid rule sits at 34045.23 while EvoDR reaches 22108.98.
      </p>
    </div>
    <div class="paper-text-cn">
      EvoDR 在 24 个场景中的 19 个取得最低拖期，整体均值最优（ARI 35.62%）。未取胜的场景多为低负载工况——此时单一混合规则已接近最优，例如 5-12-0.7-20-1 场景 FIFO+SPT 为 134.31、EvoDR 为 129.94（注：该场景更优的 MOPNR+SPT 为 127.94）。负载越高差距越大：3-6-0.7-50-4 场景下最优混合规则为 34045.23，EvoDR 为 22108.98。
    </div>

    <div class="paper-figure paper-figure--constrained">
      <img src="/images/evodr/figure_rb_results.png" alt="Robustness across Operating Conditions" loading="lazy">
      <p class="paper-figure__caption">Tardiness distribution of all methods across the 24 operating conditions. Traditional hybrids are highly condition-sensitive; EvoDR stays stable as <code>&mu;</code> increases.</p>
    </div>

    <div class="paper-section__subtitle">Ablation Study</div>
    <table class="paper-table">
      <tr><th>Variant</th><th>What is removed</th><th>Avg. tardiness</th><th>ARI &uarr;</th></tr>
      <tr><td>EDR-D</td><td>Dynamic features in the prompt</td><td>1195.37 &plusmn; 55.69</td><td>6.08%</td></tr>
      <tr><td>EDR-E</td><td>Elite-knowledge-guided initialization</td><td>1434.77 &plusmn; 291.70</td><td>&minus;12.73%</td></tr>
      <tr><td>EDR-C</td><td>Crossover operators (C1, C2)</td><td>1151.20 &plusmn; 33.06</td><td>9.55%</td></tr>
      <tr><td>EDR-M</td><td>Improvement operators (M1, M2)</td><td>1185.85 &plusmn; 88.08</td><td>6.83%</td></tr>
      <tr><td>EDR-F(order)</td><td>Order-level features</td><td>1579.27 &plusmn; 227.22</td><td>&minus;24.08%</td></tr>
      <tr><td>EDR-F(machine)</td><td>Machine-level features</td><td>1140.60 &plusmn; 65.30</td><td>10.39%</td></tr>
      <tr><td>EDR-F(arc)</td><td>Arc-level (graph topology) features</td><td>1630.28 &plusmn; 54.90</td><td>&minus;28.09%</td></tr>
      <tr><td>EDR-S</td><td>LLM-S semantic evaluation (hybrid evaluation)</td><td>1272.80 &plusmn; 52.73</td><td>0.00%</td></tr>
      <tr><td>EDR-S(fix)</td><td>LLM-S replaced by fixed suggestions</td><td>1215.87 &plusmn; 101.79</td><td>4.47%</td></tr>
      <tr><td>EDR-S(random)</td><td>LLM-S replaced by random suggestions</td><td>1107.07 &plusmn; 8.49</td><td>13.02%</td></tr>
      <tr class="best"><td><strong>EvoDR</strong></td><td>(full model)</td><td><strong>1084.17 &plusmn; 12.56</strong></td><td><strong>14.82%</strong></td></tr>
    </table>
    <div class="paper-text">
      <p>
        Feature design dominates: dropping <strong>arc</strong> (&minus;28.09%) or <strong>order</strong> (&minus;24.08%) features is catastrophic, while dropping machine features still leaves a competitive rule — under dual kitting constraints, topological and job-level dynamics matter far more than the processing units themselves. Elite-knowledge initialization is the second largest contributor.
      </p>
      <p>
        The hybrid-evaluation result deserves a caveat: removing LLM-S entirely hurts (1272.80), but replacing it with <strong>random</strong> suggestions scores 1107.07, only 23 above the full model. So the benefit is not simply "semantic quality"; any clear feedback that widens the search helps. The paper therefore checks stability: with a small suggestion pool (4) random feedback stays competitive, but with an expanded pool (37) it becomes markedly unstable and degrades, whereas LLM-S's scheduling-specific feedback keeps the directed value. Random feedback is a lucky configuration, not a robust substitute.
      </p>
    </div>
    <div class="paper-text-cn">
      特征设计影响最大：去掉弧特征（−28.09%）或订单特征（−24.08%）会灾难性退化，而机器特征缺失仍能保持有竞争力——在双 kitting 约束下，拓扑与订单级动态远比加工单元本身重要。精英知识初始化是第二大贡献项。
      混合评估这一项并不单调：完全去掉 LLM-S 会退化到 1272.80，但换成随机建议也有 1107.07，仅比完整模型差 23。收益并不完全来自语义质量本身——任何清晰的反馈都能拓宽搜索。论文对稳定性做了验证：建议池小（4 条）时随机反馈尚有竞争力，扩大到 37 条后明显不稳定并退化，而 LLM-S 的调度专属反馈保持定向价值。随机反馈只是碰巧合适的配置，不是稳健替代。
    </div>

    <div class="paper-figure paper-figure--constrained">
      <img src="/images/evodr/figure_llmsconvergence.png" alt="Convergence with 4 and 37 Suggestion Pools" loading="lazy">
      <p class="paper-figure__caption">Convergence of the random-feedback variant with a suggestion pool of 4 (left) and 37 (right): competitive when small, unstable when expanded.</p>
    </div>

    <div class="paper-section__subtitle">Cost</div>
    <table class="paper-compare-table">
      <tr><th>Method</th><th>All (Avg.)</th><th>Tokens</th><th>Code accuracy</th><th>Cost (USD)</th></tr>
      <tr><td>EoH</td><td>1297.4</td><td>0.32M</td><td>87.3%</td><td>0.131</td></tr>
      <tr><td>ReEvo</td><td>1242.9</td><td>1.36M</td><td>70.4%</td><td>0.558</td></tr>
      <tr class="best"><td><strong>EvoDR</strong></td><td><strong>1185.1</strong></td><td>0.30M / 0.16M</td><td><strong>89.3%</strong></td><td>0.123 / 0.066</td></tr>
    </table>
    <div class="paper-text">
      <p>
        Cost is reported as LLM-A / LLM-S. A full run costs about <strong>$0.19</strong> in total, with LLM-S adding roughly 0.16M tokens on top of LLM-A's 0.30M. This is a <em>one-time offline design cost</em>: at run time the evolved rule only performs one priority ranking over candidate arcs per decision, executes in sub-milliseconds, and makes no LLM call. The honest comparison is that EvoDR costs somewhat more than EoH ($0.19 vs $0.131) and buys a much larger tardiness reduction for it.
      </p>
    </div>
    <div class="paper-text-cn">
      成本按 LLM-A / LLM-S 分别报告。完整一次设计约 $0.19，其中 LLM-S 在 LLM-A 的 0.30M token 之外额外消耗约 0.16M。这笔开销只发生一次：在线运行时进化出的规则每次决策只做一次候选弧排序，亚毫秒级，不调用 LLM。EvoDR 的成本高于 EoH（$0.19 vs $0.131），换取明显更低的拖期。
    </div>
  </div>

  <div class="paper-section">
    <h2 class="paper-section__title">5. What the Design Buys</h2>

    <div class="paper-philosophy">
      <div class="paper-philosophy__title"><i class="fas fa-lightbulb"></i> Modelling decisions as arcs, not as separate scores</div>
      <div class="paper-philosophy__text">Ranking <strong>(job, machine)</strong> arcs on a heterogeneous graph lets one rule serve processing, assembly and delivery at once. Most failures of hand-crafted hybrids come from assigning job and machine priorities independently.</div>
      <div class="paper-philosophy__cn">在异构图上对 (工件, 机器) 弧排序，一条规则同时服务加工、装配与交付；手工混合规则的失效多源于把工件优先级与机器优先级独立打分。</div>
    </div>

    <div class="paper-philosophy">
      <div class="paper-philosophy__title"><i class="fas fa-lightbulb"></i> The scheduling expert steers, but does not rank</div>
      <div class="paper-philosophy__text">LLM-S output enters the generation prompt only. Fitness, parent selection and survival selection stay purely objective, which keeps the evolutionary pressure honest while still injecting scheduling semantics that numbers cannot express.</div>
      <div class="paper-philosophy__cn">LLM-S 的输出只进入生成提示；适应度、父代选择与生存选择保持纯客观。进化压力不被主观评价污染，同时又能注入数字指标表达不出的调度语义。</div>
    </div>

    <div class="paper-philosophy">
      <div class="paper-philosophy__title"><i class="fas fa-lightbulb"></i> Operators as prompts, so no primitive set is needed</div>
      <div class="paper-philosophy__text">C1, C2, M1 and M2 are four task descriptions rather than four genetic operators. Unlike GP, nothing about the problem has to be pre-encoded as terminals, which is why the same framework transfers across 24 operating conditions.</div>
      <div class="paper-philosophy__cn">C1/C2/M1/M2 是四段任务描述，不是四个遗传算子。与 GP 不同，问题无需预先编码成终结符集合，因此同一框架可跨 24 种工况迁移。</div>
    </div>
  </div>

  <div class="paper-section">
    <h2 class="paper-section__title">BibTeX</h2>
    <div class="paper-bibtex">
@article{qiu2026evodr,
  title   = {EvoDR: Evolving Dispatching Rules via Large Language
             Model for Dynamic Flexible Assembly Flow Shop
             Scheduling},
  author  = {Qiu, Junhao and Zhuang, Haoyang and Liu, Fei and
             Liu, Jianjun and Zhang, Qingfu},
  journal = {IEEE Transactions on Evolutionary Computation},
  year    = {2026},
  note    = {arXiv:2601.15738},
  url     = {https://github.com/jhqiu1/EvoDR}
}
    </div>
  </div>

</div>
