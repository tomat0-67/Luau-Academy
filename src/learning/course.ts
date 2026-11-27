import courseData from '../../content/courses/luau-fondamentaux.json'

export type TutorialLesson = {
  id: string
  title: string
  objective: string
  explanation: string[]
  steps?: string[]
  code: string
  exercise: string
  solution: string
  nextSteps?: string
}

export type TutorialCourse = {
  id: string
  title: string
  description: string
  level: string
  estimatedMinutes: number
  lessons: TutorialLesson[]
}

export const tutorialCourse = courseData satisfies TutorialCourse
