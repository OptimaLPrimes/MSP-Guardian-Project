'use server';

/**
 * @fileOverview SuperOps PSA/RMM integration flows.
 *
 * - fetchSuperOpsAlerts - Simulates fetching high-severity alerts from SuperOps.
 * - triageAndCreateTicket - Simulates creating a SuperOps ticket from an alert with AI-powered triage.
 * - TriageAndCreateTicketInput - Input for triageAndCreateTicket flow.
 * - TriageAndCreateTicketOutput - Output for triageAndCreateTicket flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { THREATS } from '@/lib/mock-data';
import type { Threat } from '@/lib/types';

// 1. Function to fetch high-severity alerts
const fetchSuperOpsAlertsFlow = ai.defineFlow(
  {
    name: 'fetchSuperOpsAlertsFlow',
    outputSchema: z.array(z.any()),
  },
  async () => {
    console.log('Simulating API call to SuperOps getAlertList endpoint...');
    // In a real scenario, this would be a fetch call to the SuperOps API.
    // We are using mock data for now.
    const highSeverityAlerts = THREATS.filter(
      (threat) => threat.severity === 'high' || threat.severity === 'critical'
    );
    // The user requested storing this in Firestore. In a real-world continuous sync,
    // we would write this to a 'superops-alerts' collection here.
    // For this simulation, we'll just return the data.
    return highSeverityAlerts;
  }
);

export async function fetchSuperOpsAlerts(): Promise<Threat[]> {
  return await fetchSuperOpsAlertsFlow();
}

// 2. Function to triage and create a ticket

const TriageAndCreateTicketInputSchema = z.object({
  alert: z.any().describe('The alert payload from which to create a ticket.'),
});
export type TriageAndCreateTicketInput = z.infer<
  typeof TriageAndCreateTicketInputSchema
>;

const TriageAndCreateTicketOutputSchema = z.object({
  ticketId: z.string().describe('The ID of the newly created ticket.'),
  category: z.string().describe('The AI-suggested category for the ticket.'),
  priority: z.string().describe('The AI-suggested priority for the ticket.'),
  summary: z.string().describe('A brief summary of the ticket.'),
});
export type TriageAndCreateTicketOutput = z.infer<
  typeof TriageAndCreateTicketOutputSchema
>;

const triagePrompt = ai.definePrompt({
  name: 'triagePrompt',
  input: { schema: z.object({ alert: z.any() }) },
  output: {
    schema: z.object({
      category: z
        .string()
        .describe(
          'e.g., "Security", "Network", "Hardware", "Software", "User Access"'
        ),
      priority: z
        .string()
        .describe('e.g., "Urgent", "High", "Medium", "Low"'),
    }),
  },
  prompt: `You are an expert security analyst. Based on the following alert, determine the appropriate Category and Priority for a support ticket.
  
  Alert: {{{JSON.stringify alert}}}
  
  Respond with only the JSON object containing the category and priority.`,
});

const triageAndCreateTicketFlow = ai.defineFlow(
  {
    name: 'triageAndCreateTicketFlow',
    inputSchema: TriageAndCreateTicketInputSchema,
    outputSchema: TriageAndCreateTicketOutputSchema,
  },
  async ({ alert }: TriageAndCreateTicketInput) => {
    console.log('Starting AI triage for alert:', alert.id);

    // Placeholder for Gemini LLM call to auto-fill category and priority
    const { output: triageResult } = await triagePrompt({ alert });

    if (!triageResult) {
      throw new Error('AI Triage failed');
    }

    console.log('AI Triage Result:', triageResult);

    const ticketPayload = {
      subject: `Security Alert: ${alert.type} for ${alert.client}`,
      description: alert.description,
      requester: 'MSP Guardian',
      category: triageResult.category, // AI-filled
      priority: triageResult.priority, // AI-filled
    };

    console.log(
      'Simulating SuperOps createTicket mutation with payload:',
      ticketPayload
    );

    // In a real scenario, this would be a fetch call to the SuperOps API
    const mockTicketId = `TCKT-${Math.floor(Math.random() * 9000) + 1000}`;

    return {
      ticketId: mockTicketId,
      category: triageResult.category,
      priority: triageResult.priority,
      summary: ticketPayload.subject,
    };
  }
);

export async function triageAndCreateTicket(
  input: TriageAndCreateTicketInput
): Promise<TriageAndCreateTicketOutput> {
  return await triageAndCreateTicketFlow(input);
}
