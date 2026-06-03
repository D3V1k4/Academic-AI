import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { BRANCHES, SEMESTERS } from "@/lib/constants";
import useUserStore from "@/store/userStore";

function StepHeader({ step, total, title, description }) {
  return (
    <div className="space-y-3">
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-primary transition-all duration-300" style={{ width: `${(step / total) * 100}%` }} />
      </div>
      <div>
        <p className="text-sm text-muted">Step {step} of {total}</p>
        <h2 className="mt-1 text-2xl font-bold text-white">{title}</h2>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
    </div>
  );
}

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const updateProfile = useUserStore((s) => s.updateProfile);

  const [step, setStep] = useState(1);
  const [subjects, setSubjects] = useState([{ name: "", examDate: "" }]);
  const [difficultySubjects, setDifficultySubjects] = useState([]);
  const [dailyHours, setDailyHours] = useState(4);
  const [targetCGPA, setTargetCGPA] = useState(8.5);
  const [done, setDone] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      branch: BRANCHES[0],
      semester: 1,
      university: "",
    },
  });

  const branch = watch("branch");
  const semester = watch("semester");

  const toggleDifficulty = (subject) => {
    setDifficultySubjects((prev) =>
      prev.includes(subject) ? prev.filter((item) => item !== subject) : [...prev, subject]
    );
  };

  const addSubject = () => setSubjects((prev) => [...prev, { name: "", examDate: "" }]);
  const updateSubject = (index, key, value) => {
    setSubjects((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  };

  const complete = async (values) => {
    const payload = {
      ...values,
      subjects,
      difficultySubjects,
      dailyHours,
      targetCGPA,
      onboardingComplete: true,
    };

    try {
      await updateProfile(payload);
      setDone(true);
      toast.success("Onboarding completed");
      setTimeout(() => navigate("/dashboard"), 1800);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not save onboarding");
    }
  };

  const semesterButtons = useMemo(() => SEMESTERS, []);

  return (
    <div className="min-h-screen bg-navy px-4 py-8 md:px-6">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <Card variant="dark" padding="lg">
          <StepHeader
            step={step}
            total={4}
            title={
              step === 1
                ? "Tell us about your studies"
                : step === 2
                ? "Set your exam schedule"
                : step === 3
                ? "Plan your study time"
                : "Almost there!"
            }
            description="We’ll use this to personalize your AcademicAI experience."
          />
        </Card>

        <form onSubmit={handleSubmit(complete)} className="space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="s1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                <Card variant="dark" padding="lg">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white">Branch</label>
                      <select className="input-base" {...register("branch")}>
                        {BRANCHES.map((item) => (
                          <option className="text-navy" key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white">University</label>
                      <Input placeholder="University name" {...register("university")} />
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="mb-3 text-sm font-medium text-white">Semester</p>
                    <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
                      {semesterButtons.map((sem) => (
                        <button
                          type="button"
                          key={sem}
                          onClick={() => setValue("semester", sem)}
                          className={`rounded-xl border px-4 py-3 font-semibold transition-all ${
                            Number(semester) === sem
                              ? "border-amber bg-primary text-navy"
                              : "border-[color:var(--border)] bg-white/5 text-white hover:bg-white/10"
                          }`}
                        >
                          {sem}
                        </button>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : null}

            {step === 2 ? (
              <motion.div key="s2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                <Card variant="dark" padding="lg">
                  <div className="space-y-4">
                    {subjects.map((subject, index) => (
                      <div key={index} className="grid gap-3 md:grid-cols-2">
                        <Input
                          label={`Subject ${index + 1}`}
                          placeholder="Subject name"
                          value={subject.name}
                          onChange={(e) => updateSubject(index, "name", e.target.value)}
                        />
                        <Input
                          label="Exam date"
                          type="date"
                          value={subject.examDate}
                          onChange={(e) => updateSubject(index, "examDate", e.target.value)}
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addSubject}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl border border-primary/40 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
                  >
                    <Plus className="h-4 w-4" />
                    Add another subject
                  </button>
                </Card>
              </motion.div>
            ) : null}

            {step === 3 ? (
              <motion.div key="s3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                <Card variant="dark" padding="lg">
                  <div className="space-y-6">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-sm font-medium text-white">Daily study hours</label>
                        <span className="text-sm text-primary">{dailyHours} hrs</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="12"
                        value={dailyHours}
                        onChange={(e) => setDailyHours(Number(e.target.value))}
                        className="w-full accent-[var(--color-primary)]"
                      />
                    </div>

                    <div>
                      <p className="mb-3 text-sm font-medium text-white">Which subjects feel hardest?</p>
                      <div className="flex flex-wrap gap-2">
                        {subjects.map((subject, index) => (
                          <button
                            type="button"
                            key={`${subject.name}-${index}`}
                            onClick={() => toggleDifficulty(subject.name || `Subject ${index + 1}`)}
                            className={`rounded-full border px-4 py-2 text-sm transition-all ${
                              difficultySubjects.includes(subject.name || `Subject ${index + 1}`)
                                ? "border-primary bg-primary text-navy"
                                : "border-[color:var(--border)] bg-white/5 text-white hover:bg-white/10"
                            }`}
                          >
                            {subject.name || `Subject ${index + 1}`}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-sm font-medium text-white">Target CGPA</label>
                        <span className="text-sm text-primary">{targetCGPA.toFixed(1)}</span>
                      </div>
                      <input
                        type="range"
                        min="6"
                        max="10"
                        step="0.1"
                        value={targetCGPA}
                        onChange={(e) => setTargetCGPA(Number(e.target.value))}
                        className="w-full accent-[var(--color-primary)]"
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : null}

            {step === 4 ? (
              <motion.div key="s4" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                <Card variant="dark" padding="lg">
                  {done ? (
                    <div className="space-y-4 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">You&apos;re all set!</h3>
                      <p className="text-muted">Redirecting you to your dashboard...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-[color:var(--border)] bg-white/5 p-4 text-white">
                        <p><span className="text-muted">Branch:</span> {branch}</p>
                        <p><span className="text-muted">Semester:</span> {semester}</p>
                        <p><span className="text-muted">Daily hours:</span> {dailyHours}</p>
                        <p><span className="text-muted">Subjects:</span> {subjects.length}</p>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              Back
            </Button>

            {step < 4 ? (
              <Button
                type="button"
                variant="primary"
                onClick={() => setStep((s) => Math.min(4, s + 1))}
              >
                Next
              </Button>
            ) : (
              <Button type="submit" variant="primary">
                Finish Setup
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
