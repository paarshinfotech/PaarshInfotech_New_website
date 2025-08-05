
export default function RefundPolicyPage() {
  return (
    <main className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">
          RETURN POLICY
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          LAST UPDATED: January 01, 2025
        </p>

        <div className="space-y-8 text-foreground/80 prose prose-lg max-w-none">
            <div>
                <h2 className="text-2xl font-bold text-primary">REFUND</h2>
                <p>All sales are final and no refund will be issued.</p>
            </div>
            
            <div>
                <h2 className="text-2xl font-bold text-primary">QUESTIONS</h2>
                <p>
                If you have any questions concerning our return policy, please get in touch with us at info@paarshinfotech.com.
                </p>
            </div>
        </div>
      </div>
    </main>
  );
}
