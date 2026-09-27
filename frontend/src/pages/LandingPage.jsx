import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  Database,
  Play,
  Sparkles,
  TrendingUp,
} from 'lucide-react'

const pipeline = [
  {
    number: '01',
    title: 'Business Analyst',
    description: 'Maps the operating model, constraints, and growth opportunities into a structured hypothesis.',
  },
  {
    number: '02',
    title: 'Market Research',
    description: 'Synthesizes customer demand, category shifts, and competitive motion into market insight.',
  },
  {
    number: '03',
    title: 'Benchmarking',
    description: 'Compares peer performance, pricing, and efficiency signals to establish strategic context.',
  },
  {
    number: '04',
    title: 'Financial Analysis',
    description: 'Models profit, margin, and resource implications to quantify operational leverage.',
  },
  {
    number: '05',
    title: 'Strategy Advisor',
    description: 'Prioritizes options, trade-offs, and focus bets for the executive team.',
  },
  {
    number: '06',
    title: 'Report Writer',
    description: 'Transforms the output into a decision-ready board package with clear actions and owners.',
  },
]

const socialProof = ['Northstar', 'Sable Labs', 'Crestline', 'Argent']

const pricingTiers = [
  {
    name: 'Operator',
    price: '$49',
    suffix: '/mo',
    description: 'For lean teams turning insight into weekly action.',
    features: ['6-agent diagnostic workflow', 'Board-ready summary PDF', 'Competitor and pricing scan', 'Priority support'],
  },
  {
    name: 'Advisory Firm',
    price: '$199',
    suffix: '/mo',
    description: 'For firms managing multiple engagements and client narratives.',
    features: ['Everything in Operator', 'Multi-client operating workspace', 'Shared strategic dossier library', 'Executive briefing automation'],
    highlighted: true,
  },
]

const typingLines = [
  'Initializing Business Analyst...',
  'Formulating MECE hypothesis...',
  'Cross-checking competitor motion...',
  'Modeling revenue and margin trade-offs...',
  'Drafting board-ready recommendation set...',
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export default function LandingPage() {
  const [displayedText, setDisplayedText] = useState('')
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    const currentLine = typingLines[lineIndex]
    if (!currentLine) return

    const timer = setTimeout(() => {
      const nextChar = currentLine[displayedText.length]
      if (nextChar) {
        setDisplayedText((prev) => prev + nextChar)
      } else {
        const nextLine = setTimeout(() => {
          setLineIndex((prev) => (prev + 1) % typingLines.length)
          setDisplayedText('')
        }, 1200)

        return () => clearTimeout(nextLine)
      }
    }, 26)

    return () => clearTimeout(timer)
  }, [displayedText, lineIndex])

  const terminalText = useMemo(() => {
    return `${displayedText}${displayedText.length < typingLines[lineIndex].length ? '|' : ''}`
  }, [displayedText, lineIndex])

  return (
    <div className="min-h-screen bg-[#111111] text-[#EDEDED]">
      <header className="sticky top-0 z-50 border-b border-[#262626] bg-[#111111]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[#2b2b2b] bg-[#171717] text-[10px] font-semibold tracking-[0.2em] text-[#D97757]">
              AC
            </div>
            <div>
              <div className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#D97757]">Advisory</div>
              <div className="text-sm font-semibold text-[#EDEDED]">Neuraedge</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-[#999999] md:flex">
            <Link to="/" className="transition-colors duration-200 hover:text-[#EDEDED]">Platform</Link>
            <Link to="/b2b" className="transition-colors duration-200 hover:text-[#EDEDED]">Use Cases</Link>
            <Link to="/pricing" className="transition-colors duration-200 hover:text-[#EDEDED]">Pricing</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-md border border-[#262626] bg-transparent px-4 py-2 text-sm font-medium text-[#EDEDED] transition-colors duration-200 hover:border-[#D97757] hover:text-[#D97757]"
            >
              Sign In
            </Link>
            <Link
              to="/dashboard"
              className="rounded-md border border-[#D97757] bg-[#D97757] px-4 py-2 text-sm font-medium text-[#111111] transition-colors duration-200 hover:bg-[#E38D68]"
            >
              Start Free Diagnostic
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div {...fadeUp}>
              <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.34em] text-[#D97757]">
                Strategic Advisory, Automated.
              </p>
              <h1 className="max-w-xl font-['Space_Grotesk','sans-serif'] text-4xl font-medium leading-[0.96] tracking-[-0.06em] text-[#EDEDED] sm:text-5xl lg:text-[5rem]">
                McKinsey-Grade Strategy. Executed in 60 Seconds.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#999999] lg:text-lg">
                Deploy a 6-agent autonomous pipeline to diagnose margin leakage, benchmark competitors,
                and generate a boardroom-ready turnaround dossier.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-md border border-[#D97757] bg-[#D97757] px-5 py-3 text-sm font-medium text-[#111111] transition-colors duration-200 hover:bg-[#E38D68]"
                >
                  Start Free Diagnostic
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/b2b"
                  className="inline-flex items-center gap-2 rounded-md border border-[#262626] bg-[#171717] px-5 py-3 text-sm font-medium text-[#EDEDED] transition-colors duration-200 hover:border-[#D97757] hover:text-[#D97757]"
                >
                  <Play size={16} />
                  See Demo
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[#999999]">
                {['Margin Intelligence', 'Competitive Watch', 'Operating Model', 'Portfolio Strategy'].map((tag) => (
                  <span key={tag} className="rounded-full border border-[#262626] bg-[#161616] px-2.5 py-2">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -left-8 top-8 h-36 w-36 rounded-full border border-[#2b2b2b] bg-[#171717]" />
              <div className="absolute -right-4 bottom-8 h-32 w-32 rounded-full border border-[#D97757]/40 bg-[#D97757]/10" />

              <div className="relative overflow-hidden rounded-2xl border border-[#262626] bg-[#121212] shadow-[0_0_0_1px_rgba(38,38,38,0.9)]">
                <div className="flex items-center gap-2 border-b border-[#262626] bg-[#171717] px-4 py-3">
                  {[ 'bg-[#4D4D4D]', 'bg-[#6F6F6F]', 'bg-[#D97757]' ].map((dot, idx) => (
                    <span key={idx} className={`h-2.5 w-2.5 rounded-full ${dot}`} />
                  ))}
                </div>

                <div className="space-y-4 bg-[#111111] p-5 font-mono text-sm text-[#EDEDED]">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#999999]">
                    <Sparkles size={12} className="text-[#D97757]" />
                    Autonomous Strategy Layer
                  </div>

                  <div className="space-y-2 text-[13px] text-[#EDEDED]">
                    {typingLines.slice(0, 3).map((line, idx) => (
                      <div key={line} className="flex items-center gap-2 text-[#D0D0D0]">
                        <span className="text-[#D97757]">&gt;</span>
                        <span className={idx === lineIndex ? 'text-[#EDEDED]' : 'text-[#9f9f9f]'}>{line}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg border border-[#262626] bg-[#171717] p-4">
                    <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#999999]">
                      <span>Live signal</span>
                      <span className="text-[#D97757]">ACTIVE</span>
                    </div>
                    <div className="mb-4 flex items-center justify-between text-sm text-[#EDEDED]">
                      <span>Margin leakage</span>
                      <span className="font-medium text-[#D97757]">-18.4%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#1d1d1d]">
                      <div className="h-full w-[72%] rounded-full bg-[#D97757]" />
                    </div>
                    <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[#999999]">
                      <span>Confidence</span>
                      <span>87%</span>
                    </div>
                  </div>

                  <div className="text-[13px] text-[#EDEDED]">
                    <span className="text-[#D97757]">&gt;</span>
                    <span className="ml-2">{terminalText}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-[#262626] bg-[#171717]">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center gap-4 text-center text-[#999999] md:flex-row md:gap-8">
              <span className="text-[10px] uppercase tracking-[0.32em] text-[#999999]">Trusted by operators and partners at</span>
              <div className="flex flex-wrap items-center justify-center gap-6 text-lg font-medium uppercase tracking-[0.18em] text-[#666666]">
                {socialProof.map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-10 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#D97757]">6-Agent Architecture</p>
            <h2 className="mt-4 font-['Space_Grotesk','sans-serif'] text-3xl tracking-[-0.05em] text-[#EDEDED] sm:text-4xl">
              A diagnostic engine built for operating decisions.
            </h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pipeline.map((step, index) => (
              <motion.div
                key={step.title}
                {...fadeUp}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-2xl border border-[#262626] bg-[#171717] p-5 transition-colors duration-200 hover:border-[#D97757]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#D97757]">{step.number}</span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#D97757]" />
                </div>
                <h3 className="text-xl font-semibold text-[#EDEDED]">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#999999]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="border-y border-[#262626] bg-[#171717] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="mb-10 max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#D97757]">Product Overview</p>
              <h2 className="mt-4 font-['Space_Grotesk','sans-serif'] text-3xl tracking-[-0.05em] text-[#EDEDED] sm:text-4xl">
                Minimal inputs. Boardroom-grade outputs.
              </h2>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div {...fadeUp} className="rounded-2xl border border-[#262626] bg-[#111111] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#999999]">Minimal Inputs</p>
                    <h3 className="mt-2 text-2xl font-semibold text-[#EDEDED]">Diagnostic intake</h3>
                  </div>
                  <div className="rounded-full border border-[#262626] bg-[#171717] p-2 text-[#D97757]">
                    <BriefcaseBusiness size={18} />
                  </div>
                </div>

                <div className="space-y-4 rounded-xl border border-[#262626] bg-[#171717] p-5">
                  <div>
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-[#999999]">Revenue</label>
                    <div className="rounded-md border border-[#262626] bg-[#111111] px-3 py-2 text-[#EDEDED]">$4.8M ARR</div>
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-[#999999]">Burn rate</label>
                    <div className="rounded-md border border-[#262626] bg-[#111111] px-3 py-2 text-[#EDEDED]">$310K / quarter</div>
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-[#999999]">Problem</label>
                    <div className="rounded-md border border-[#262626] bg-[#111111] px-3 py-2 text-[#EDEDED]">Margin erosion in SMB sales motion</div>
                  </div>
                </div>
              </motion.div>

              <motion.div {...fadeUp} className="rounded-2xl border border-[#262626] bg-[#111111] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#999999]">Boardroom Outputs</p>
                    <h3 className="mt-2 text-2xl font-semibold text-[#EDEDED]">Turnaround dossier</h3>
                  </div>
                  <div className="rounded-full border border-[#262626] bg-[#171717] p-2 text-[#D97757]">
                    <BarChart3 size={18} />
                  </div>
                </div>

                <div className="rounded-xl border border-[#262626] bg-[#171717] p-4">
                  <div className="mb-4 flex items-center justify-between border-b border-[#262626] pb-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-[#999999]">Executive Summary</p>
                      <h4 className="mt-2 text-xl font-semibold text-[#EDEDED]">Northstar Labs</h4>
                    </div>
                    <span className="rounded-full border border-[#D97757]/30 bg-[#D97757]/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[#D97757]">
                      Q3 Update
                    </span>
                  </div>

                  <div className="space-y-3 text-sm leading-7 text-[#999999]">
                    <p>Distribution and retention are healthy, but pricing compression is absorbing 18% of margin in the SMB segment.</p>
                    <div className="overflow-hidden rounded-lg border border-[#262626]">
                      <table className="w-full border-collapse text-left text-sm">
                        <thead className="bg-[#111111] text-[#EDEDED]">
                          <tr>
                            <th className="px-3 py-2">Metric</th>
                            <th className="px-3 py-2">Current</th>
                            <th className="px-3 py-2">Target</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-[#262626]">
                            <td className="px-3 py-2 text-[#999999]">Gross Margin</td>
                            <td className="px-3 py-2 text-[#EDEDED]">31%</td>
                            <td className="px-3 py-2 text-[#D97757]">38%</td>
                          </tr>
                          <tr className="border-t border-[#262626]">
                            <td className="px-3 py-2 text-[#999999]">CAC</td>
                            <td className="px-3 py-2 text-[#EDEDED]">$8.4k</td>
                            <td className="px-3 py-2 text-[#D97757]">$6.1k</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-10 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#D97757]">Pricing</p>
            <h2 className="mt-4 font-['Space_Grotesk','sans-serif'] text-3xl tracking-[-0.05em] text-[#EDEDED] sm:text-4xl">
              Choose the operating rhythm your team needs.
            </h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                {...fadeUp}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`rounded-2xl border p-6 ${tier.highlighted ? 'border-[#D97757] bg-[#171717]' : 'border-[#262626] bg-[#111111]'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#999999]">{tier.name}</p>
                    <div className="mt-4 flex items-end gap-2">
                      <span className="font-['Space_Grotesk','sans-serif'] text-4xl tracking-[-0.05em] text-[#EDEDED]">{tier.price}</span>
                      <span className="pb-1 text-sm text-[#999999]">{tier.suffix}</span>
                    </div>
                  </div>
                  {tier.highlighted && (
                    <span className="rounded-full border border-[#D97757]/30 bg-[#D97757]/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[#D97757]">
                      Popular
                    </span>
                  )}
                </div>

                <p className="mt-4 text-sm leading-7 text-[#999999]">{tier.description}</p>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-[#EDEDED]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D97757] text-[#111111]">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/login"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${tier.highlighted ? 'border border-[#D97757] bg-[#D97757] text-[#111111] hover:bg-[#E38D68]' : 'border border-[#262626] bg-[#171717] text-[#EDEDED] hover:border-[#D97757] hover:text-[#D97757]'}`}
                >
                  {tier.highlighted ? 'Start Advisory Plan' : 'Choose Operator'}
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp}
            className="rounded-2xl border border-[#262626] bg-[#171717] px-6 py-12 text-center sm:px-10"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#D97757]">Agency-grade intelligence</p>
            <h2 className="mt-4 font-['Space_Grotesk','sans-serif'] text-3xl tracking-[-0.05em] text-[#EDEDED] sm:text-5xl">
              Stop guessing. Start diagnosing.
            </h2>
            <div className="mt-8 flex justify-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-md border border-[#D97757] bg-[#D97757] px-6 py-3 text-sm font-medium text-[#111111] transition-colors duration-200 hover:bg-[#E38D68]"
              >
                Start Free Diagnostic
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[#999999]">
              <Link to="/b2b" className="transition-colors duration-200 hover:text-[#EDEDED]">Platform</Link>
              <Link to="/pricing" className="transition-colors duration-200 hover:text-[#EDEDED]">Pricing</Link>
              <Link to="/login" className="transition-colors duration-200 hover:text-[#EDEDED]">Sign In</Link>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}
