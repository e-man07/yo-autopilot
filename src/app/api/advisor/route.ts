import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ADVISOR_SYSTEM_PROMPT, buildAdvisorUserPrompt } from '@/lib/advisor-prompt';
import { AdvisorRequest, AdvisorResponse, VaultId } from '@/types';
import { RISK_TO_VAULT } from '@/lib/constants';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');

function buildFallbackResponse(request: AdvisorRequest): AdvisorResponse {
  const vault: VaultId = RISK_TO_VAULT[request.goal.riskLevel];
  const apy = request.vaultData[vault]?.apy ?? 10;
  const monthly = (request.goal.targetAmount * (apy / 100)) / 12;
  const daysUntilTarget = Math.max(
    1,
    Math.ceil((new Date(request.goal.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );
  const byTarget = monthly * (daysUntilTarget / 30);

  return {
    recommendation: {
      vault,
      reason: `Based on your ${request.goal.riskLevel} risk preference, the ${vault} savings account is the best match. It offers stable yields through diversified lending protocols.`,
    },
    yieldExplanation:
      'Your earnings come from lending your deposits to overcollateralized borrowers through trusted protocols. Borrowers pay interest, and that interest flows to you.',
    projectedEarnings: {
      monthly: Math.round(monthly * 100) / 100,
      byTarget: Math.round(byTarget * 100) / 100,
      willMeetGoal: byTarget >= request.goal.targetAmount * 0.05,
    },
    riskAssessment: {
      level: request.goal.riskLevel === 'conservative' ? 'Low' : request.goal.riskLevel === 'balanced' ? 'Medium' : 'High',
      factors: [
        'Smart contract risk — all protocols are audited but code can have bugs',
        vault !== 'yoUSD' ? 'Market risk — asset price can fluctuate' : 'Minimal price risk — stablecoins track USD',
      ],
      mitigations: [
        'Deposits are spread across multiple audited protocols',
        'You can withdraw anytime',
      ],
    },
  };
}

export async function POST(req: NextRequest) {
  let body: AdvisorRequest | null = null;

  try {
    body = await req.json();

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return NextResponse.json(buildFallbackResponse(body!));
    }

    const userPrompt = buildAdvisorUserPrompt({
      goal: body!.goal,
      vaultData: body!.vaultData,
      prices: body!.prices,
    });

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7,
        maxOutputTokens: 20000,
        // @ts-expect-error -- Gemini SDK types may lag behind API
        thinkingConfig: { thinkingBudget: 8000 },
      },
    });

    const result = await model.generateContent(
      ADVISOR_SYSTEM_PROMPT + '\n\n' + userPrompt
    );

    const content = result.response.text();
    if (!content) {
      return NextResponse.json(buildFallbackResponse(body!));
    }

    // Extract JSON from response (handle markdown fences if present)
    let jsonStr = content.trim();
    const fenceMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) jsonStr = fenceMatch[1].trim();

    const parsed: AdvisorResponse = JSON.parse(jsonStr);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Advisor error:', error instanceof Error ? error.message : error);
    if (body) {
      return NextResponse.json(buildFallbackResponse(body));
    }
    return NextResponse.json(
      { error: 'Failed to generate recommendation' },
      { status: 500 }
    );
  }
}
