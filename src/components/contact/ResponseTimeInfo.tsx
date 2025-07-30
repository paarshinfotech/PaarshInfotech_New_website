"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LuClock, LuShieldCheck } from "react-icons/lu";

export function ResponseTimeInfo() {
  return (
    <Card className="bg-secondary/50">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <LuClock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Our Commitment to You</h4>
            <p className="text-sm text-muted-foreground">
              We strive to respond to all inquiries within 24 business hours. For urgent matters, please call us directly.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <LuShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Privacy Assurance</h4>
            <p className="text-sm text-muted-foreground">
              Your information is safe with us. We will never share your details with third parties without your consent.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
