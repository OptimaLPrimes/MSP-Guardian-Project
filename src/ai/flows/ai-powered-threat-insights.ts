'use server';

/**
 * @fileOverview An AI-powered threat insights flow.
 *
 * - aiPoweredThreatInsights - A function that analyzes threat data using AI and provides insights into potential risks.
 * - AIPoweredThreatInsightsInput - The input type for the aiPoweredThreatInsights function.
 * - AIPoweredThreatInsightsOutput - The return type for the aiPoweredThreatInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredThreatInsightsInputSchema = z.object({
  threatData: z
    .string()
    .describe('A string containing threat data to be analyzed.'),
});
export type AIPoweredThreatInsightsInput = z.infer<typeof AIPoweredThreatInsightsInputSchema>;

const AIPoweredThreatInsightsOutputSchema = z.object({
  insights: z.string().describe('AI-generated insights into potential risks.'),
  recommendations: z
    .string()
    .describe('AI-generated recommendations to address security vulnerabilities.'),
});
export type AIPoweredThreatInsightsOutput = z.infer<typeof AIPoweredThreatInsightsOutputSchema>;

export async function aiPoweredThreatInsights(
  input: AIPoweredThreatInsightsInput
): Promise<AIPoweredThreatInsightsOutput> {
  return aiPoweredThreatInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredThreatInsightsPrompt',
  input: {schema: AIPoweredThreatInsightsInputSchema},
  output: {schema: AIPoweredThreatInsightsOutputSchema},
  prompt: `You are a cybersecurity expert analyzing threat data to provide insights and recommendations.

  Analyze the following threat data and provide insights into potential risks and recommendations to address security vulnerabilities.
  Threat Data: {{{threatData}}}

  Format your response as follows:
  Insights: [AI-generated insights into potential risks]
  Recommendations: [AI-generated recommendations to address security vulnerabilities]`,
});

const aiPoweredThreatInsightsFlow = ai.defineFlow(
  {
    name: 'aiPoweredThreatInsightsFlow',
    inputSchema: AIPoweredThreatInsightsInputSchema,
    outputSchema: AIPoweredThreatInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
