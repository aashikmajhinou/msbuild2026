import { useMemo, useState } from 'react'

type DemoStep = {
  id: number
  title: string
  description: string
  detail: string
}

const demoSteps: DemoStep[] = [
  {
    id: 1,
    title: 'Edit locally',
    description: 'Make a small change on your laptop.',
    detail: 'You work in your own branch, test the idea, and keep the change isolated from everyone else.',
  },
  {
    id: 2,
    title: 'Commit snapshot',
    description: 'Save a meaningful checkpoint.',
    detail: 'A commit captures what changed and why, so the history stays readable and reversible.',
  },
  {
    id: 3,
    title: 'Push to GitHub',
    description: 'Share your branch with the remote repo.',
    detail: 'Git sends the commit objects to GitHub so the team can see the work and collaborate on it.',
  },
  {
    id: 4,
    title: 'Open a pull request',
    description: 'Turn the branch into a reviewable conversation.',
    detail: 'GitHub adds discussion, checks, and review on top of Git’s version control workflow.',
  },
  {
    id: 5,
    title: 'Review and merge',
    description: 'Approve the change and land it safely.',
    detail: 'The branch is merged back into main, and the change becomes part of the shared project history.',
  },
]

const comparison = [
  {
    label: 'Git',
    title: 'The version control engine',
    text: 'Tracks changes, branches, commits, and merges on your machine and in your repo.',
  },
  {
    label: 'GitHub',
    title: 'The collaboration layer',
    text: 'Hosts repos, pull requests, code review, issues, and team workflows around Git.',
  },
]

const highlights = [
  'Show the “local change → shared change” story clearly.',
  'Use the stepper live during the demo to narrate each stage.',
  'Keep the page visual, fast, and easy to explain in under a minute.',
]

function App() {
  const [activeStepId, setActiveStepId] = useState(1)

  const activeStep = useMemo(
    () => demoSteps.find((step) => step.id === activeStepId) ?? demoSteps[0],
    [activeStepId],
  )

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur sm:p-8 lg:p-10">
          <div className="flex flex-col gap-10">
            <header className="max-w-3xl">
              <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                Issue #12 demo build
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Git tracks the change.
                <span className="block text-blue-600">GitHub helps the team ship it.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                A live-coding page for the stage: simple, visual, and built to explain the full path from a local edit to a merged pull request.
              </p>
            </header>

            <div className="grid gap-4 md:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {comparison.map((item) => (
                <article
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                    {item.label}
                  </span>
                  <h2 className="mt-4 text-2xl font-bold text-slate-950">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>

            <section className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
              <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-lg">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-blue-200">Workflow story</p>
                    <h2 className="mt-1 text-2xl font-bold">Clone → branch → commit → push → PR</h2>
                  </div>
                  <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">
                    interactive
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                  {demoSteps.map((step) => {
                    const isActive = step.id === activeStepId
                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => setActiveStepId(step.id)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          isActive
                            ? 'border-blue-400 bg-blue-500/20 ring-2 ring-blue-400/40'
                            : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">
                          Step {step.id}
                        </span>
                        <h3 className="mt-2 text-base font-semibold text-white">{step.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{step.description}</p>
                      </button>
                    )
                  })}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">
                    Currently selected
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white">{activeStep.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{activeStep.detail}</p>
                </div>
              </div>

              <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-950">Demo talking points</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  This makes the issue easy to present live: the audience sees the flow, the difference between Git and GitHub, and why pull requests matter.
                </p>

                <div className="mt-6 space-y-4">
                  {demoSteps.map((step) => (
                    <div
                      key={step.id}
                      className={`rounded-2xl border px-4 py-4 transition ${
                        step.id === activeStepId
                          ? 'border-blue-200 bg-blue-50'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                          {step.id}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-950">{step.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-slate-600">{step.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
