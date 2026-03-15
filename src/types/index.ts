export interface QuizAnswers {
  budget: string
  climate: 'warm' | 'mild' | 'cold' | 'any'
  remoteWork: 'yes' | 'no' | 'hybrid'
  healthcare: 'low' | 'medium' | 'high'
  language: 'english-only' | 'willing-to-learn' | 'fluent-spanish' | 'fluent-other'
  region: 'europe' | 'latin-america' | 'asia' | 'anywhere'
  lifestyle: 'beach' | 'city' | 'nature' | 'culture' | 'any'
}

export interface CountryRecommendation {
  country: string
  flag: string
  score: number
  cities: string[]
  costOfLiving: string
  visaOptions: string[]
  pros: string[]
  cons: string[]
  summary: string
  relocationPlan?: string
  visaDetails?: string
  housingWebsites?: string[]
  neighborhoods?: string[]
  taxInfo?: string
  healthcareSetup?: string
  timeline?: string[]
}

export interface RelocPlan {
  id?: string
  userId?: string
  quizAnswers: QuizAnswers
  recommendations: CountryRecommendation[]
  isPremium: boolean
  createdAt?: string
}
