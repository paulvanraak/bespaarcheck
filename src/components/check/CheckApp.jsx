import { useState } from 'react'
import { UserProvider } from '../../context/UserContext'
import { useCheckStore } from '../../store/checkStore'
import { useUser } from '../../context/UserContext'
import { CHECK_STEPS } from '../../data/checkQuestions'
import { calculateSavings, calculateScore } from '../../services/savings'
import { saveCheck } from '../../services/check'
import CheckIntro from './CheckIntro'
import CheckLayout from './CheckLayout'
import CheckStep from './CheckStep'

function CheckPageInner() {
  const [started, setStarted] = useState(false)
  const [saving, setSaving] = useState(false)
  const { user } = useUser()
  const { currentStep, answers, nextStep, prevStep, reset } = useCheckStore()

  if (!started) {
    return <CheckIntro onStart={() => setStarted(true)} />
  }

  const isLastStep = currentStep === CHECK_STEPS.length - 1

  async function handleNext() {
    if (isLastStep) {
      setSaving(true)
      try {
        const { results, totalSavings } = await calculateSavings(answers)
        const score = calculateScore(results, totalSavings)
        const check = await saveCheck({
          userId: user?.id,
          answers,
          results,
          totalSavings,
          score,
        })
        reset()
        window.location.href = `/bespaarcheck/check/resultaten/${check.id}/`
      } catch (err) {
        console.error('Opslaan mislukt:', err)
        // Bereken wel, sla niet op — gebruik sessionStorage als fallback
        const { results, totalSavings } = await calculateSavings(answers)
        const score = calculateScore(results, totalSavings)
        sessionStorage.setItem('localCheckResult', JSON.stringify({ results, totalSavings, score, answers }))
        window.location.href = '/bespaarcheck/check/resultaten/local/'
      } finally {
        setSaving(false)
      }
    } else {
      nextStep()
    }
  }

  return (
    <CheckLayout
      step={CHECK_STEPS[currentStep]}
      currentIndex={currentStep}
      total={CHECK_STEPS.length}
      onNext={saving ? undefined : handleNext}
      onPrev={prevStep}
      isLast={isLastStep}
      saving={saving}
      answers={answers}
    >
      <CheckStep step={CHECK_STEPS[currentStep]} />
    </CheckLayout>
  )
}

export default function CheckApp() {
  return (
    <UserProvider>
      <CheckPageInner />
    </UserProvider>
  )
}
