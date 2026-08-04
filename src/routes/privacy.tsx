import { createFileRoute, Link } from "@tanstack/react-router";
import vektissLogo from "@/assets/vektiss-logo-cropped.webp";

const TITLE = "Vektiss Privacy Policy";
const DESCRIPTION =
  "Learn how Vektiss collects, uses, stores, and protects personal information across its websites, AI systems, and services.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 text-xl font-bold leading-tight text-foreground sm:mt-12 sm:text-2xl lg:text-3xl">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 text-lg font-bold text-foreground sm:mt-8 sm:text-xl">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
      {children}
    </p>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-base text-foreground/90 sm:text-lg">
      {children}
    </ul>
  );
}

function LI({ children }: { children: React.ReactNode }) {
  return <li className="leading-relaxed">{children}</li>;
}

function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link to="/" className="flex items-center">
            <img
              src={vektissLogo}
              alt="Vektiss"
              className="h-8 w-auto sm:h-9"
            />
          </Link>
          <Link
            to="/"
            className="text-sm font-semibold text-foreground hover:text-primary sm:text-base"
          >
            Back to site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <p className="eyebrow mb-3 text-xs sm:text-sm">Legal</p>
        <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
          Vektiss Privacy Policy
        </h1>
        <p className="mt-4 text-sm font-semibold text-foreground sm:text-base">
          Effective Date: August 4, 2026
        </p>

        <P>
          Vektiss (“Vektiss,” “we,” “us,” or “our”) respects your privacy and is
          committed to protecting the personal information entrusted to us.
        </P>
        <P>
          This Privacy Policy explains how we collect, use, disclose, store, and
          otherwise process personal information when you:
        </P>
        <UL>
          <LI>Visit a Vektiss website or landing page.</LI>
          <LI>Submit an application, inquiry, or contact form.</LI>
          <LI>Schedule a consultation.</LI>
          <LI>Purchase or use a Vektiss product or service.</LI>
          <LI>Communicate with us by telephone, text message, email, or another channel.</LI>
          <LI>Interact with a Vektiss-powered AI phone, text, or email system.</LI>
          <LI>Receive services from a business that uses Vektiss technology.</LI>
        </UL>
        <P>
          This Privacy Policy applies to Vektiss Voice and other websites,
          applications, artificial intelligence systems, automations,
          communication tools, and services operated or managed by Vektiss
          collectively referred to as the “Services.”
        </P>

        <H2>1. Contact Information</H2>
        <P>
          Questions, requests, or concerns about this Privacy Policy may be sent to:
        </P>
        <P>
          <strong>Vektiss</strong>
          <br />
          Attn: Privacy and Compliance
          <br />
          525 North Sam Houston Parkway East, Suite 415
          <br />
          Houston, Texas 77060
          <br />
          Email:{" "}
          <a
            href="mailto:info@vektiss.com"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            info@vektiss.com
          </a>
        </P>

        <H2>2. Information We Collect</H2>
        <P>
          The personal information we collect depends on how you interact with
          Vektiss and the Services.
        </P>
        <H3>Information You Provide Directly</H3>
        <UL>
          <LI>Full name.</LI>
          <LI>Business name.</LI>
          <LI>Email address.</LI>
          <LI>Telephone number.</LI>
          <LI>Mailing or business address.</LI>
          <LI>Website address.</LI>
          <LI>Job title.</LI>
          <LI>Industry.</LI>
          <LI>Business size or revenue range.</LI>
          <LI>Call or lead volume.</LI>
          <LI>Average customer or client value.</LI>
          <LI>Business challenges and operational needs.</LI>
          <LI>Appointment and scheduling information.</LI>
          <LI>Information submitted through an application or consultation form.</LI>
          <LI>Payment and billing information.</LI>
          <LI>Communications and support requests.</LI>
          <LI>Reviews, testimonials, photographs, videos, or other materials you submit.</LI>
        </UL>
        <H3>Call, Text, and Email Information</H3>
        <P>
          When you communicate with Vektiss or interact with a Vektiss-powered
          system, we may process:
        </P>
        <UL>
          <LI>Caller and recipient telephone numbers.</LI>
          <LI>Call date, time, duration, and routing information.</LI>
          <LI>Call recordings where recording is enabled and legally permitted.</LI>
          <LI>Call transcripts.</LI>
          <LI>Voicemail messages.</LI>
          <LI>Text-message content.</LI>
          <LI>Email content and metadata.</LI>
          <LI>Customer-service requests.</LI>
          <LI>Quote or estimate requests.</LI>
          <LI>Appointment requests and booking information.</LI>
          <LI>Lead qualification responses.</LI>
          <LI>Hiring inquiries and application requests.</LI>
          <LI>AI-generated call or message summaries.</LI>
          <LI>Tags, categories, routing decisions, and follow-up statuses.</LI>
        </UL>
        <P>
          A notice may be provided when a call is recorded or when you are
          interacting with an automated or AI-powered assistant.
        </P>
        <H3>Information Processed for Vektiss Clients</H3>
        <P>
          Vektiss may process personal information on behalf of businesses that
          use our Services.
        </P>
        <P>
          For example, a Vektiss client may use Vektiss Voice to:
        </P>
        <UL>
          <LI>Answer incoming calls.</LI>
          <LI>Respond to potential customers.</LI>
          <LI>Collect information for a quote.</LI>
          <LI>Qualify leads.</LI>
          <LI>Schedule appointments.</LI>
          <LI>Provide status updates.</LI>
          <LI>Route callers to the appropriate department.</LI>
          <LI>Send forms or hiring applications.</LI>
          <LI>Follow up by telephone, text, or email.</LI>
        </UL>
        <P>
          When Vektiss processes information for a client, the client generally
          determines why the information is collected and how it is used.
          Questions about a client’s use of your information should ordinarily be
          directed to the business with which you were communicating.
        </P>
        <H3>Payment Information</H3>
        <P>
          Payments may be processed by third-party payment providers. Vektiss may
          receive limited transaction information, such as:
        </P>
        <UL>
          <LI>Billing name and address.</LI>
          <LI>Payment status.</LI>
          <LI>Transaction amount.</LI>
          <LI>Payment date.</LI>
          <LI>Last four digits of the payment method.</LI>
          <LI>Card type and expiration information.</LI>
        </UL>
        <P>Vektiss does not ordinarily store complete payment-card numbers.</P>
        <H3>Automatically Collected Information</H3>
        <P>
          When you access our websites or online Services, we and our service
          providers may automatically collect:
        </P>
        <UL>
          <LI>IP address.</LI>
          <LI>Browser type.</LI>
          <LI>Device type.</LI>
          <LI>Operating system.</LI>
          <LI>Device identifiers.</LI>
          <LI>Approximate location derived from an IP address.</LI>
          <LI>Referring website.</LI>
          <LI>Pages viewed.</LI>
          <LI>Links clicked.</LI>
          <LI>Date and time of access.</LI>
          <LI>Time spent on a page.</LI>
          <LI>Form activity.</LI>
          <LI>Advertising and campaign attribution.</LI>
          <LI>Cookie and analytics identifiers.</LI>
        </UL>

        <H2>3. Cookies and Similar Technologies</H2>
        <P>
          Vektiss and our service providers may use cookies, pixels, scripts,
          tags, and similar technologies to:
        </P>
        <UL>
          <LI>Operate our website.</LI>
          <LI>Remember preferences.</LI>
          <LI>Understand how visitors use our website.</LI>
          <LI>Measure advertising performance.</LI>
          <LI>Identify errors.</LI>
          <LI>Improve website functionality.</LI>
          <LI>Prevent fraud and abuse.</LI>
          <LI>Attribute inquiries and applications to advertising campaigns.</LI>
        </UL>
        <P>
          You may be able to control cookies through your browser settings or a
          cookie-management tool displayed on our website. Disabling certain
          cookies may affect how portions of the website function.
        </P>

        <H2>4. How We Use Personal Information</H2>
        <P>Vektiss may use personal information to:</P>
        <UL>
          <LI>Provide, configure, and manage the Services.</LI>
          <LI>Respond to inquiries and applications.</LI>
          <LI>Determine whether a prospective client may be a suitable fit.</LI>
          <LI>Schedule and conduct consultations.</LI>
          <LI>Create and manage client accounts.</LI>
          <LI>Process payments.</LI>
          <LI>Build AI phone, text, and email systems.</LI>
          <LI>Answer and route calls.</LI>
          <LI>Qualify and follow up with leads.</LI>
          <LI>Schedule appointments.</LI>
          <LI>Provide customer or vehicle status updates.</LI>
          <LI>Send requested forms, links, or hiring applications.</LI>
          <LI>Maintain call histories and communication records.</LI>
          <LI>Provide technical support.</LI>
          <LI>Monitor and improve system performance.</LI>
          <LI>Detect errors, fraud, misuse, and security threats.</LI>
          <LI>Analyze website and advertising performance.</LI>
          <LI>Develop and improve our Services.</LI>
          <LI>Comply with legal requirements.</LI>
          <LI>Enforce our agreements.</LI>
          <LI>Protect Vektiss, our clients, users, and service providers.</LI>
          <LI>Send permitted transactional or marketing communications.</LI>
        </UL>

        <H2>5. Artificial Intelligence and Automated Processing</H2>
        <P>
          The Services may use artificial intelligence, machine learning,
          automated workflows, transcription, voice-generation, language models,
          and other automated tools.
        </P>
        <P>These systems may:</P>
        <UL>
          <LI>Answer questions.</LI>
          <LI>Transcribe or summarize calls.</LI>
          <LI>Classify inquiries.</LI>
          <LI>Identify the caller’s requested department.</LI>
          <LI>Route communications.</LI>
          <LI>Gather qualification information.</LI>
          <LI>Recommend or trigger follow-up actions.</LI>
          <LI>Schedule or request appointments.</LI>
          <LI>Generate draft responses.</LI>
          <LI>Send client-approved information and resources.</LI>
        </UL>
        <P>
          AI-generated content can sometimes be inaccurate, incomplete, or
          misunderstood. Vektiss and its clients should maintain appropriate
          human oversight, especially for legal, medical, financial, employment,
          credit, insurance, emergency, or other consequential matters.
        </P>
        <P>
          Unless expressly disclosed and legally permitted, Vektiss does not use
          personal information to make solely automated decisions that produce
          legal or similarly significant effects concerning an individual.
        </P>

        <H2>6. Call Recording and Transcription</H2>
        <P>
          Calls made to or through the Services may be recorded, monitored, or
          transcribed when enabled by Vektiss or a Vektiss client.
        </P>
        <P>Recording may be used to:</P>
        <UL>
          <LI>Provide the requested service.</LI>
          <LI>Document customer requests.</LI>
          <LI>Improve service quality.</LI>
          <LI>Train or evaluate communication workflows.</LI>
          <LI>Resolve disputes.</LI>
          <LI>Maintain security.</LI>
          <LI>Comply with legal requirements.</LI>
        </UL>
        <P>
          Where required, notice or consent will be provided before recording.
          Vektiss clients are responsible for determining and providing any
          notices required for their specific use of call recording and
          transcription.
        </P>

        <H2>7. How We Disclose Personal Information</H2>
        <P>
          Vektiss does not sell personal information for money. We may disclose
          personal information in the following circumstances.
        </P>
        <H3>Service Providers</H3>
        <P>
          We may provide information to vendors that help us operate and deliver
          the Services, including providers of:
        </P>
        <UL>
          <LI>Website hosting.</LI>
          <LI>Cloud storage.</LI>
          <LI>Artificial intelligence.</LI>
          <LI>Telephone and SMS services.</LI>
          <LI>Email delivery.</LI>
          <LI>Call recording and transcription.</LI>
          <LI>Customer relationship management.</LI>
          <LI>Appointment scheduling.</LI>
          <LI>Workflow automation.</LI>
          <LI>Analytics.</LI>
          <LI>Advertising measurement.</LI>
          <LI>Cybersecurity.</LI>
          <LI>Payment processing.</LI>
          <LI>Customer support.</LI>
          <LI>Professional consulting.</LI>
        </UL>
        <P>
          These service providers may process information only as necessary to
          perform services for Vektiss or as otherwise permitted by their
          agreements and applicable law.
        </P>
        <H3>Vektiss Clients</H3>
        <P>
          When you interact with a system operated for a Vektiss client,
          information collected through that interaction may be provided to the
          client.
        </P>
        <P>For example, we may provide a client with:</P>
        <UL>
          <LI>Your name and contact information.</LI>
          <LI>Your call recording or transcript.</LI>
          <LI>Your quote request.</LI>
          <LI>Your appointment information.</LI>
          <LI>Your qualification answers.</LI>
          <LI>Your hiring inquiry.</LI>
          <LI>Your customer-service request.</LI>
          <LI>A summary of your interaction.</LI>
        </UL>
        <H3>Business Transfers</H3>
        <P>
          Information may be transferred as part of a merger, acquisition,
          financing, restructuring, sale of assets, bankruptcy, or similar
          business transaction.
        </P>
        <H3>Legal and Safety Disclosures</H3>
        <P>
          We may disclose information when we reasonably believe disclosure is
          necessary to:
        </P>
        <UL>
          <LI>Comply with a law, subpoena, court order, or legal process.</LI>
          <LI>Respond to a government request.</LI>
          <LI>Enforce our agreements.</LI>
          <LI>Investigate fraud, misuse, or security incidents.</LI>
          <LI>Protect the rights, property, safety, or security of Vektiss, our clients, users, or others.</LI>
          <LI>Prevent unlawful or harmful activity.</LI>
        </UL>
        <H3>With Your Direction or Consent</H3>
        <P>
          We may disclose information when you request, direct, or consent to
          the disclosure.
        </P>

        <H2>8. Marketing Communications</H2>
        <P>
          When legally permitted or when you provide appropriate consent, Vektiss
          may send information about:
        </P>
        <UL>
          <LI>Your inquiry or application.</LI>
          <LI>Your scheduled consultation.</LI>
          <LI>Products and Services.</LI>
          <LI>Educational resources.</LI>
          <LI>Offers and promotions.</LI>
          <LI>Account or service updates.</LI>
        </UL>
        <P>You may opt out of marketing communications by:</P>
        <UL>
          <LI>Clicking the unsubscribe link in an email.</LI>
          <LI>Replying STOP to eligible text messages.</LI>
          <LI>
            Emailing{" "}
            <a
              href="mailto:info@vektiss.com"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              info@vektiss.com
            </a>
            .
          </LI>
        </UL>
        <P>
          Message and data rates may apply. Opting out of marketing messages does
          not prevent Vektiss from sending necessary transactional, account,
          appointment, billing, security, or service-related messages.
        </P>

        <H2>9. Telephone and Text Consent</H2>
        <P>
          When you submit your telephone number and affirmatively agree to be
          contacted, you authorize Vektiss to contact you regarding your inquiry,
          application, consultation, account, or Services.
        </P>
        <P>
          Communications may include telephone calls and text messages made using
          automated technology where permitted by law. Consent to receive
          marketing communications is not a condition of purchasing a Service
          unless clearly disclosed and legally permitted.
        </P>
        <P>
          You may withdraw consent or request that communications stop through
          any reasonable method, including replying STOP to eligible text
          messages or contacting{" "}
          <a
            href="mailto:info@vektiss.com"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            info@vektiss.com
          </a>
          .
        </P>

        <H2>10. Data Retention</H2>
        <P>
          We retain personal information for as long as reasonably necessary to:
        </P>
        <UL>
          <LI>Provide the Services.</LI>
          <LI>Maintain client and business records.</LI>
          <LI>Complete transactions.</LI>
          <LI>Support customers.</LI>
          <LI>Fulfill the purposes described in this Privacy Policy.</LI>
          <LI>Meet contractual requirements.</LI>
          <LI>Resolve disputes.</LI>
          <LI>Prevent fraud and abuse.</LI>
          <LI>Comply with tax, accounting, legal, and regulatory obligations.</LI>
          <LI>Establish, exercise, or defend legal claims.</LI>
        </UL>
        <P>
          Retention periods vary based on the type of information, the applicable
          client relationship, legal requirements, and operational needs. When
          information is no longer reasonably required, we may delete it,
          anonymize it, or securely isolate it from further use.
        </P>

        <H2>11. Data Security</H2>
        <P>
          Vektiss uses reasonable administrative, organizational, and technical
          measures designed to protect personal information.
        </P>
        <P>These measures may include:</P>
        <UL>
          <LI>Access controls.</LI>
          <LI>Authentication requirements.</LI>
          <LI>Encryption where appropriate.</LI>
          <LI>Vendor review.</LI>
          <LI>System monitoring.</LI>
          <LI>Secure development practices.</LI>
          <LI>Data minimization.</LI>
          <LI>Incident-response procedures.</LI>
          <LI>Employee and contractor confidentiality obligations.</LI>
        </UL>
        <P>
          No online system, communication method, or storage service can be
          guaranteed to be completely secure. You are responsible for protecting
          passwords, access credentials, and devices connected to your Vektiss
          account or systems.
        </P>

        <H2>12. Sensitive Information</H2>
        <P>
          Do not provide highly sensitive information through a Vektiss website,
          call, text, email, or AI system unless it is specifically requested
          through an approved and secure process.
        </P>
        <P>Highly sensitive information may include:</P>
        <UL>
          <LI>Social Security numbers.</LI>
          <LI>Complete payment-card numbers.</LI>
          <LI>Banking passwords.</LI>
          <LI>Authentication codes.</LI>
          <LI>Government identification numbers.</LI>
          <LI>Detailed medical records.</LI>
          <LI>Protected health information.</LI>
          <LI>Biometric identifiers.</LI>
          <LI>Other information requiring specialized legal or security protections.</LI>
        </UL>
        <P>
          Vektiss does not represent that every Service is compliant with HIPAA,
          PCI DSS, GLBA, FERPA, or another specialized regulatory framework
          unless that obligation is expressly accepted in a written agreement.
        </P>

        <H2>13. Third-Party Websites and Services</H2>
        <P>
          Our websites and Services may contain links to or integrations with
          third-party websites, software, applications, calendars, payment
          processors, social media platforms, or other services.
        </P>
        <P>
          Vektiss does not control the privacy practices of these third parties.
          Your use of a third-party service is governed by that provider’s
          privacy policy and terms.
        </P>

        <H2>14. Children’s Privacy</H2>
        <P>
          The Vektiss website and Services are intended for businesses and adults
          and are not directed toward children under 18.
        </P>
        <P>
          We do not knowingly collect personal information directly from
          children under 18 through our website for marketing purposes. If you
          believe a child has submitted personal information directly to Vektiss
          without appropriate authorization, contact us at{" "}
          <a
            href="mailto:info@vektiss.com"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            info@vektiss.com
          </a>
          .
        </P>
        <P>
          This section does not prevent a Vektiss client from lawfully
          communicating with a parent or guardian concerning a child or
          providing a service involving minors when appropriate protections and
          permissions are in place.
        </P>

        <H2>15. Your Privacy Rights</H2>
        <P>
          Depending on where you live and whether a particular privacy law
          applies, you may have the right to:
        </P>
        <UL>
          <LI>Confirm whether we process your personal information.</LI>
          <LI>Request access to personal information.</LI>
          <LI>Request correction of inaccurate information.</LI>
          <LI>Request deletion of information.</LI>
          <LI>Request a portable copy of certain information.</LI>
          <LI>Opt out of certain targeted advertising.</LI>
          <LI>Opt out of the sale or sharing of personal information.</LI>
          <LI>Opt out of certain profiling or automated processing.</LI>
          <LI>Withdraw consent.</LI>
          <LI>Appeal the denial of a privacy request.</LI>
          <LI>Receive equal service without unlawful discrimination for exercising a privacy right.</LI>
        </UL>
        <P>
          These rights are subject to legal limitations, exceptions, identity
          verification, and the applicability of the relevant law.
        </P>
        <H3>Submitting a Privacy Request</H3>
        <P>
          To submit a privacy request, contact:
          <br />
          <br />
          <strong>Email:</strong>{" "}
          <a
            href="mailto:info@vektiss.com"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            info@vektiss.com
          </a>
          <br />
          <strong>Mail:</strong> Vektiss, Attn: Privacy and Compliance, 525 North
          Sam Houston Parkway East, Suite 415, Houston, Texas 77060
        </P>
        <P>Please include:</P>
        <UL>
          <LI>Your full name.</LI>
          <LI>Your email address.</LI>
          <LI>Your telephone number, when relevant.</LI>
          <LI>Your relationship with Vektiss or a Vektiss client.</LI>
          <LI>The specific privacy request you are making.</LI>
        </UL>
        <P>
          We may request additional information to verify your identity and
          protect against fraudulent requests. Where permitted, an authorized
          agent may submit a request on your behalf. We may require proof that
          the agent has authority to act for you.
        </P>

        <H2>16. Texas Privacy Rights</H2>
        <P>
          If the Texas Data Privacy and Security Act applies to our processing of
          your personal data, qualifying Texas consumers may have rights to:
        </P>
        <UL>
          <LI>Confirm whether personal data is being processed.</LI>
          <LI>Access personal data.</LI>
          <LI>Correct inaccuracies.</LI>
          <LI>Delete personal data.</LI>
          <LI>Obtain a portable copy of personal data.</LI>
          <LI>Opt out of certain targeted advertising.</LI>
          <LI>Opt out of the sale of personal data.</LI>
          <LI>Opt out of certain profiling in furtherance of decisions producing legal or similarly significant effects.</LI>
        </UL>
        <P>
          You may also have the right to appeal a decision concerning your privacy
          request.
        </P>

        <H2>17. California Privacy Rights</H2>
        <P>
          If the California Consumer Privacy Act applies to our processing,
          California residents may have rights to:
        </P>
        <UL>
          <LI>Know the categories and specific pieces of personal information collected.</LI>
          <LI>Know the purposes for which information is used.</LI>
          <LI>Know the categories of sources from which information was collected.</LI>
          <LI>Know the categories of third parties to which information was disclosed.</LI>
          <LI>Request correction.</LI>
          <LI>Request deletion.</LI>
          <LI>Opt out of the sale or sharing of personal information.</LI>
          <LI>Limit certain uses or disclosures of sensitive personal information.</LI>
          <LI>Receive equal treatment when exercising applicable privacy rights.</LI>
        </UL>
        <P>
          Vektiss does not sell personal information for money. Depending on the
          cookies, advertising technologies, and business practices used on a
          particular Vektiss website, certain disclosures may be considered
          “sharing” for cross-context behavioral advertising under California
          law. Where required, Vektiss will provide an appropriate opt-out
          mechanism.
        </P>

        <H2>18. International Users</H2>
        <P>
          Vektiss is based in the United States. If you access the Services from
          outside the United States, your information may be transferred to and
          processed in the United States or another country where Vektiss or its
          service providers operate.
        </P>
        <P>
          Those countries may have data-protection laws that differ from the laws
          where you live. Where required, Vektiss will use appropriate safeguards
          for international data transfers.
        </P>

        <H2>19. Do Not Track and Privacy Signals</H2>
        <P>
          Some browsers offer “Do Not Track” settings. Because there is not one
          universally accepted standard for responding to these signals, our
          websites may not respond to traditional Do Not Track settings.
        </P>
        <P>
          Where legally required and technically supported, Vektiss may recognize
          applicable browser-based privacy preference signals, such as Global
          Privacy Control.
        </P>

        <H2>20. Changes to This Privacy Policy</H2>
        <P>
          Vektiss may update this Privacy Policy from time to time to reflect
          changes in:
        </P>
        <UL>
          <LI>Our Services.</LI>
          <LI>Our information practices.</LI>
          <LI>Technology.</LI>
          <LI>Legal requirements.</LI>
          <LI>Business operations.</LI>
        </UL>
        <P>
          The updated policy will be posted with a revised effective date. When
          required by law, we will provide additional notice or obtain consent
          before materially changing how personal information is used.
        </P>

        <H2>21. Contact Us</H2>
        <P>
          For questions, concerns, or privacy requests, contact:
          <br />
          <br />
          <strong>Vektiss</strong>
          <br />
          Attn: Privacy and Compliance
          <br />
          525 North Sam Houston Parkway East, Suite 415
          <br />
          Houston, Texas 77060
          <br />
          Email:{" "}
          <a
            href="mailto:info@vektiss.com"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            info@vektiss.com
          </a>
        </P>

        <p className="mt-12 text-sm text-muted-foreground sm:text-base">
          © 2026 Vektiss. All Rights Reserved.
        </p>
      </main>
    </div>
  );
}
