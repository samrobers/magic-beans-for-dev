import React from 'react';

const HELP_SECTIONS = [
  {
    title: "Saddle Up - Gettin' Started",
    icon: '🤠',
    items: [
      {
        q: "What in tarnation is this place?",
        a: "This here's Rango's Desert Outpost - a dusty little frontier town where each building is its own tool. Wander in, poke around, and don't mind the tumbleweeds."
      },
      {
        q: "How do I pick which building to visit?",
        a: "Just mosey back to the home page and click any building with an 'Open' sign on it. Buildings marked 'Soon' are still bein' built by the crew."
      }
    ]
  },
  {
    title: "The Chart Saloon - Pourin' Charts",
    icon: '🍺',
    items: [
      {
        q: "How do I rustle up a chart?",
        a: "Saddle into the Chart Saloon, start with a Wanted Poster (that's a template), then mosey through the tabs - Basic, Axes, Data, Advanced, and Animations - to dial in your chart just how you like it."
      },
      {
        q: "How do I get my chart out of the saloon?",
        a: "Once your chart's lookin' sharp, hit the Copy Code button and the whole Chart.js recipe lands on your clipboard, ready to paste wherever you need it."
      },
      {
        q: "What's the difference between the two previews?",
        a: "The Sheriff's Official View shows you the real, honest-to-goodness Chart.js renderin' - exactly what you'll get. The Scout's View is a rough sketch that's quicker on the draw but not always true to life."
      },
      {
        q: "What's this Showdown mode I keep hearin' about?",
        a: "Showdown (some folks call it diverging) mode lines your bars up against a center line - perfect for squarin' off positives against negatives, like performance versus targets."
      }
    ]
  },
  {
    title: "Troubleshootin' - When the Trail Gets Rough",
    icon: '🔧',
    items: [
      {
        q: "My chart looks all cactus - where do I start?",
        a: "Check your data first, partner. Make sure every dataset has a value for every label. Then peek at your axis min and max settings - leave 'em blank for auto."
      },
      {
        q: "The copy button didn't do nothin'.",
        a: "Some browsers get skittish about the clipboard. Try again, or select the code in the box yourself and give it the old Ctrl+C."
      }
    ]
  }
];

const HelpCorral = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900">
      {/* Desert Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-300 via-amber-500 to-amber-900 opacity-20"></div>

      {/* Back to Outpost Navigation */}
      <nav className="relative z-20 p-4">
        <button
          onClick={() => window.location.href = './'}
          className="flex items-center gap-2 px-4 py-2 bg-amber-800/30 hover:bg-amber-700/40 text-amber-200 rounded-lg border border-amber-600/30 transition-all"
        >
          ⬅️ Back to Desert Outpost
        </button>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-16">
        {/* Header */}
        <header className="text-center py-10">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-100 mb-3 drop-shadow-lg">
            🤠 The Help Corral
          </h1>
          <p className="text-xl text-amber-200 italic">
            "Where questions get roped and answers get branded"
          </p>
        </header>

        {/* Sections */}
        <div className="space-y-8">
          {HELP_SECTIONS.map((section) => (
            <div
              key={section.title}
              className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-600/30"
            >
              <h2 className="text-2xl font-bold text-amber-100 mb-4">
                {section.icon} {section.title}
              </h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <details
                    key={item.q}
                    className="bg-amber-900/15 border border-amber-600/30 rounded-lg group"
                  >
                    <summary className="cursor-pointer px-4 py-3 text-amber-100 font-medium hover:bg-amber-800/20 rounded-lg transition-colors list-none flex items-center justify-between gap-2">
                      <span>{item.q}</span>
                      <span className="text-amber-300 group-open:rotate-90 transition-transform">▶</span>
                    </summary>
                    <p className="px-4 pb-4 pt-1 text-amber-200 leading-relaxed">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Quote */}
        <div className="text-center mt-12">
          <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-600/30 max-w-xl mx-auto">
            <p className="text-amber-200 italic text-lg">
              "If you can't find your answer in this corral, just ride around the
              fences a spell - it usually turns up."
            </p>
            <p className="text-amber-300 text-sm mt-2">- Sheriff Rango</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCorral;
