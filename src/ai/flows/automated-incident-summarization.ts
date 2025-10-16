'use server';

/**
 * @fileOverview A security incident summarization AI agent.
 *
 * - summarizeIncident - A function that handles the security incident summarization process.
 * - SummarizeIncidentInput - The input type for the summarizeIncident function.
 * - SummarizeIncidentOutput - The return type for the summarizeIncident function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeIncidentInputSchema = z.object({
  incidentDetails: z
    .string()
    .describe('Detailed description of the security incident.'),
});
export type SummarizeIncidentInput = z.infer<typeof SummarizeIncidentInputSchema>;

const SummarizeIncidentOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the security incident.'),
});
export type SummarizeIncidentOutput = z.infer<typeof SummarizeIncidentOutputSchema>;

export async function summarizeIncident(input: SummarizeIncidentInput): Promise<SummarizeIncidentOutput> {
  return summarizeIncidentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeIncidentPrompt',
  input: {schema: SummarizeIncidentInputSchema},
  output: {schema: SummarizeIncidentOutputSchema},
  prompt: `You are a cybersecurity expert tasked with summarizing security incidents.

  Given the details of a security incident, provide a concise summary that highlights the scope and impact of the incident.

  Incident Details: {{{incidentDetails}}}`,
});

const summarizeIncidentFlow = ai.defineFlow(
  {
    name: 'summarizeIncidentFlow',
    inputSchema: SummarizeIncidentInputSchema,
    outputSchema: SummarizeIncidentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
