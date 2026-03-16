import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { countryData } from '@/lib/countryData'
import { QuizAnswers } from '@/types'

export const maxDuration = 60

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

async function callAI(prompt: string, attempt: number): Promise<string> {
  const message = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })
  return message.content[0].type === 'text' ? message.content[0].text : ''
}

async function callWithRetry(prompt: string, maxAttempts = 3): Promise<string> {
  let lastError: Error | null = null
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await callAI(prompt, attempt)
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))
      console.error(`AI call attempt ${attempt} failed:`, lastError.message)
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, 1000 * attempt))
      }
    }
  }
  throw lastError
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const answers: QuizAnswers = body.answers

    const countryContext = JSON.stringify(countryData, null, 2)

    const prompt = `You are ExitPlan AI, an expert relocation consultant helping Americans move abroad.

A user has completed a relocation quiz with these answers:
- Monthly Budget: $${answers.budget}/month
- Preferred Climate: ${answers.climate}
- Remote Work Status: ${answers.remoteWork}
- Healthcare Importance: ${answers.healthcare}
- Language Preference: ${answers.language}
- Region Preference: ${answers.region}
- Lifestyle Preference: ${answers.lifestyle || 'any'}

Here is our country database:
${countryContext}

Based on this data AND your broader knowledge, recommend the TOP 3 best countries for this person to move to.

Respond ONLY with a valid JSON array (no markdown, no backticks) in this exact format:
[
  {
    "country": "Country Name",
    "flag": "🇵🇹",
    "score": 94,
    "cities": ["City 1", "City 2", "City 3"],
    "costOfLiving": "$1,800 - $2,800/month",
    "visaOptions": ["Visa type 1", "Visa type 2"],
    "pros": ["Pro 1", "Pro 2", "Pro 3", "Pro 4"],
    "cons": ["Con 1", "Con 2", "Con 3"],
    "summary": "2-3 sentence personalized summary of why this country is great for THIS specific user based on their quiz answers",
    "relocationPlan": "A detailed 90-day relocation plan broken into 3 phases: Days 1-30 (Prep & Research), Days 31-60 (Logistics & Setup), Days 61-90 (Arrival & Integration). Write at least 4-5 specific action items per phase."
  }
]

Score each country 1-100 based on how well it matches the user's specific needs. Make the summaries and relocation plan highly personalized to their quiz answers. Return exactly 3 countries.`

    const responseText = await callWithRetry(prompt)

    let recommendations
    try {
      recommendations = JSON.parse(responseText)
    } catch {
      const jsonMatch = responseText.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        recommendations = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('Failed to parse AI response')
      }
    }

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error('Recommendation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    )
  }
}
