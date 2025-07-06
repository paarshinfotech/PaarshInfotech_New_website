'use server';

import { smartReplyTool, type SmartReplyInput } from "@/ai/flows/smart-reply-tool";

export async function getSmartReply(input: SmartReplyInput) {
  try {
    const result = await smartReplyTool(input);
    return { success: true, content: result.followUpEmailContent };
  } catch (error) {
    console.error("Error generating smart reply:", error);
    return { success: false, error: "Failed to generate smart reply. Please try again." };
  }
}
