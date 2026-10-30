type Step = {
  title: string
  description: string
}

type ProcessStepsProps = {
  steps: Step[]
}

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <ol className="process">
      {steps.map((step) => (
        <li key={step.title} className="process__step">
          <h3 className="process__title">{step.title}</h3>
          <p className="process__description">{step.description}</p>
        </li>
      ))}
    </ol>
  )
}
