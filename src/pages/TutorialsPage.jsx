import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight, ChevronLeft, Check, BookOpen, X } from 'lucide-react';
import { tutorials } from '../data/tutorials';

function TutorialModal({ tutorial, onClose }) {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = () => {
    if (!completed.includes(step)) setCompleted(p => [...p, step]);
    if (step < tutorial.steps.length - 1) setStep(s => s + 1);
  };

  const currentStep = tutorial.steps[step];
  const progress = ((step + 1) / tutorial.steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${tutorial.color} p-6 text-white`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-3xl mb-2">{tutorial.icon}</div>
              <h2 className="text-xl font-bold">{tutorial.title}</h2>
              <p className="text-white/80 text-sm mt-1">Step {step + 1} of {tutorial.steps.length}</p>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/20 transition-colors" id="tutorial-modal-close">
              <X size={18} />
            </button>
          </div>
          {/* Progress bar */}
          <div className="mt-4 h-1.5 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step navigation dots */}
        <div className="flex items-center justify-center gap-2 px-6 py-3 border-b border-slate-100">
          {tutorial.steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === step ? 'bg-primary-600 w-4' :
                completed.includes(i) ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
              id={`tutorial-step-dot-${i}`}
            />
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            <h3 className="text-base font-bold text-slate-900 mb-3">{currentStep.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{currentStep.content}</p>

            {completed.includes(step) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 flex items-center gap-2 text-emerald-600 text-sm font-medium"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Check size={12} />
                </div>
                Step completed!
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center justify-between">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="btn-secondary btn-sm disabled:opacity-40"
            id="tutorial-prev"
          >
            <ChevronLeft size={14} /> Previous
          </button>
          <button
            onClick={markComplete}
            className="btn-primary btn-sm"
            id="tutorial-next"
          >
            {step === tutorial.steps.length - 1 ? (
              <><Check size={14} /> Complete</>
            ) : (
              <>Mark Complete <ChevronRight size={14} /></>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const difficultyColors = {
  Beginner: 'badge-green',
  Intermediate: 'badge-amber',
  Advanced: 'badge-red',
};

export default function TutorialsPage() {
  const [activeTutorial, setActiveTutorial] = useState(null);
  const [completedTutorials, setCompletedTutorials] = useState([]);

  const handleClose = () => {
    if (activeTutorial) setCompletedTutorials(p => [...new Set([...p, activeTutorial.id])]);
    setActiveTutorial(null);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 page-transition">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900">Tutorials</h1>
          <p className="text-sm text-slate-500">Learn drone design and simulation step by step</p>
        </div>

        {/* Progress banner */}
        {completedTutorials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3"
          >
            <div className="text-2xl">🎉</div>
            <div>
              <div className="text-sm font-semibold text-emerald-800">
                {completedTutorials.length} of {tutorials.length} tutorials completed!
              </div>
              <div className="h-1.5 bg-emerald-200 rounded-full mt-1 w-40 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${(completedTutorials.length / tutorials.length) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tutorials.map((tut, i) => {
            const isDone = completedTutorials.includes(tut.id);
            return (
              <motion.div
                key={tut.id}
                className="card overflow-hidden cursor-pointer group"
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.12)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setActiveTutorial(tut)}
                id={`tutorial-card-${tut.id}`}
              >
                {/* Top gradient */}
                <div className={`h-24 bg-gradient-to-br ${tut.color} relative flex items-center justify-center overflow-hidden`}>
                  <motion.div
                    className="text-4xl"
                    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    {tut.icon}
                  </motion.div>
                  {isDone && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                      <Check size={13} className="text-emerald-600" />
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-primary-700 transition-colors leading-tight">
                      {tut.title}
                    </h3>
                    <span className={`${difficultyColors[tut.difficulty] || 'badge-blue'} flex-shrink-0`}>
                      {tut.difficulty}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed mb-3">{tut.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock size={11} />
                      {tut.duration}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-primary-600 font-medium group-hover:gap-2 transition-all">
                      {isDone ? 'Review' : 'Start'}
                      <ChevronRight size={11} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeTutorial && (
          <TutorialModal tutorial={activeTutorial} onClose={handleClose} />
        )}
      </AnimatePresence>
    </div>
  );
}
