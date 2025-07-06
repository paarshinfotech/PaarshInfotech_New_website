'use server';

/**
 * @fileOverview A smart reply AI agent that generates personalized follow-up email content.
 *
 * - smartReplyTool - A function that generates follow-up email content based on the client's initial message and selected service(s).
 * - SmartReplyInput - The input type for the smartReplyTool function.
 * - SmartReplyOutput - The return type for the smartReplyTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartReplyInputSchema = z.object({
  clientMessage: z.string().describe('The client\'s initial message.'),
  selectedServices: z.array(z.string()).describe('The service(s) the client is interested in.'),
});
export type SmartReplyInput = z.infer<typeof SmartReplyInputSchema>;

const SmartReplyOutputSchema = z.object({
  followUpEmailContent: z.string().describe('The generated follow-up email content.'),
});
export type SmartReplyOutput = z.infer<typeof SmartReplyOutputSchema>;

export async function smartReplyTool(input: SmartReplyInput): Promise<SmartReplyOutput> {
  return smartReplyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartReplyPrompt',
  input: {schema: SmartReplyInputSchema},
  output: {schema: SmartReplyOutputSchema},
  prompt: `You are a helpful sales representative for Paarsh Infotech Pvt Ltd.
  A client has sent the following message:
  """{{clientMessage}}"""
  They are interested in the following services: {{selectedServices}}.

  Generate a personalized follow-up email that addresses the client\'s message and highlights the selected services.
  The email should be professional and engaging.
  Be friendly and helpful.
  Do not start with "Dear Customer", always start with "Hi there,".
  Avoid mentioning the selected service names, but be sure to still mention the services in some way.
  Keep it concise.
  Limit the email to 3 sentences.
  If the client message is negative or asking for you to do something you can\'t do, politely decline.
  If the client message is unclear, ask for clarification.
  End with a call to action, inviting the client to schedule a call or meeting.
  Follow Up Email Content:`,,
});

const smartReplyFlow = ai.defineFlow(
  {
    name: 'smartReplyFlow',
    inputSchema: SmartReplyInputSchema,
    outputSchema: SmartReplyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
