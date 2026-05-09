import { useEffect, useState } from 'react'
import { useCheckStore } from '../../store/checkStore'
import QuestionSlider from './QuestionSlider'
import QuestionChoice from './QuestionChoice'
import QuestionPostcode from './QuestionPostcode'
import { getBenchmark } from '../../services/tariffs'
import { getVisibleQuestions, getDefaultValue } from '../../services/checkFlow'

export default function CheckStep({ step }) {
  const { answers, setAnswer } = useCheckStore()
  const stepAnswers = answers[step.id] ?? {}
  const context = answers.context || {}
  const [benchmark, setBenchmark] = useState(null)

  useEffect(() => {
    getBenchmark(step.id, {
      household: context.household,
      housingType: context.housingType,
      postcode: context.postcode,
    }).then(setBenchmark)
  }, [step.id, context.household, context.housingType, context.postcode])

  const visibleQuestions = getVisibleQuestions(step, answers, context)

  return (
    <div>
      {visibleQuestions.map((question, i) => {
        const value = stepAnswers[question.key]
        const defaultVal = getDefaultValue(question, { benchmark, context })

        let el = null

        if (question.type === 'postcode') {
          el = (
            <QuestionPostcode
              question={question}
              value={value}
              onChange={(v) => setAnswer(step.id, question.key, v)}
              hint={question.hint}
            />
          )
        } else if (question.type === 'slider') {
          el = (
            <QuestionSlider
              question={question}
              value={value ?? defaultVal}
              onChange={(v) => setAnswer(step.id, question.key, v)}
            />
          )
        } else if (question.type === 'choice') {
          el = (
            <QuestionChoice
              question={question}
              value={value}
              onChange={(v) => setAnswer(step.id, question.key, v)}
              answers={answers}
            />
          )
        }

        if (!el) return null

        return (
          <div key={question.key}>
            {i > 0 && (
              <hr className="border-ink-100 mb-6" />
            )}
            {el}
          </div>
        )
      })}
    </div>
  )
}
