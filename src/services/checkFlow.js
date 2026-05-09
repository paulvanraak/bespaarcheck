export function getVisibleQuestions(step, allAnswers, context) {
  return step.questions.filter(q => {
    if (!q.showIf) return true
    return q.showIf(allAnswers, { context })
  })
}

export function getDefaultValue(question, context) {
  if (question.defaultFromBenchmark && context?.benchmark) {
    const val = question.defaultFromBenchmark(context)
    if (val != null) return val
  }
  return question.default
}
