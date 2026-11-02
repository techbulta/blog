import React from 'react';
import './BranchGraph.css';

// Decorative git branch graphs from the reference designs.
// `small` is the home hero card; the default is the article cover panel.
// Colors come from BranchGraph.css: main = mint, feature = accent, experiment = dashed.
function BranchGraph({ small = false, label }) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' };

  if (small) {
    return (
      <svg {...a11y} viewBox="0 0 440 150" className="branch-graph branch-graph--small">
        <path className="bg-main" d="M20 110 H420" />
        <path className="bg-feature" d="M80 110 C110 110 110 50 140 50 H250 C280 50 280 110 310 110" />
        <path className="bg-experiment" d="M180 110 C200 110 200 20 220 20 H260" strokeDasharray="6 6" />
        {[20, 80, 180, 420].map(cx => <circle key={cx} className="bg-main" cx={cx} cy="110" r="8" />)}
        <circle className="bg-main bg-filled" cx="310" cy="110" r="8" />
        <circle className="bg-feature" cx="160" cy="50" r="8" />
        <circle className="bg-feature" cx="230" cy="50" r="8" />
        <circle className="bg-experiment" cx="260" cy="20" r="8" />
      </svg>
    );
  }

  return (
    <svg {...a11y} viewBox="0 0 1040 220" className="branch-graph">
      <path className="bg-main" d="M20 160 H1020" />
      <path className="bg-feature" d="M120 160 C170 160 170 70 220 70 H460 C510 70 510 160 560 160" />
      <path className="bg-experiment" d="M300 160 C340 160 340 20 380 20 H440" strokeDasharray="8 8" />
      <path className="bg-feature" d="M640 160 C690 160 690 80 740 80 H860 C910 80 910 160 960 160" />
      {[20, 120, 300, 640].map(cx => <circle key={cx} className="bg-main" cx={cx} cy="160" r="10" />)}
      <circle className="bg-main bg-filled" cx="560" cy="160" r="12" />
      <circle className="bg-main bg-filled" cx="960" cy="160" r="12" />
      {[[260, 70], [360, 70], [780, 80], [840, 80]].map(([cx, cy]) => (
        <circle key={cx} className="bg-feature" cx={cx} cy={cy} r="10" />
      ))}
      <circle className="bg-experiment" cx="440" cy="20" r="10" />
    </svg>
  );
}

export default BranchGraph;
