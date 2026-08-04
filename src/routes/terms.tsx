import { createFileRoute, Link } from "@tanstack/react-router";
import vektissLogo from "@/assets/vektiss-logo-cropped.webp";

const TITLE = "Vektiss Terms and Conditions";
const DESCRIPTION =
  "These Terms and Conditions govern your access to and use of Vektiss websites, products, services, and consulting.";

export const Route = createFileRoute("/terms")({
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
  component: Terms,
});

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 text-xl font-bold leading-tight text-foreground sm:mt-12 sm:text-2xl lg:text-3xl">
      {children}
    </h2>
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

function Terms() {
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
          Vektiss Terms and Conditions
        </h1>
        <p className="mt-4 text-sm font-semibold text-foreground sm:text-base">
          Effective Date: August 4, 2026
        </p>

        <P>
          These Terms and Conditions (“Terms”) govern your access to and use of
          websites, applications, platforms, products, consulting,
          implementation, automation, artificial intelligence, communication,
          and related services operated or provided by Vektiss (“Vektiss,” “we,”
          “us,” or “our”).
        </P>
        <P>
          These services may include Vektiss Voice, AI-powered phone assistants,
          text-message systems, email assistants, appointment scheduling, lead
          qualification, customer-support workflows, business automations,
          integrations, dashboards, websites, applications, consulting,
          implementation, monitoring, and related services collectively
          referred to as the “Services.”
        </P>
        <P>
          Vektiss may be contacted at:
          <br />
          <br />
          <strong className="text-foreground">Vektiss</strong>
          <br />
          525 North Sam Houston Parkway East, Suite 415
          <br />
          Houston, Texas 77060
          <br />
          Email:{" "}
          <a
            href="mailto:info@vektiss.com"
            className="text-primary underline underline-offset-4"
          >
            info@vektiss.com
          </a>
        </P>

        <H2>Important Notice</H2>
        <P>
          Please read these Terms carefully before accessing our website,
          submitting an application, scheduling a consultation, purchasing a
          Service, signing an agreement, or using any system provided by
          Vektiss.
        </P>
        <P>
          These Terms contain important provisions concerning disclaimers,
          limitations of liability, dispute resolution, arbitration, and waiver
          of class-action rights.
        </P>
        <P>
          By accessing our website, submitting information, signing an
          agreement, purchasing a Service, or using the Services, you agree to
          these Terms and our Privacy Policy.
        </P>
        <P>
          If you do not agree to these Terms, you may not use the website or
          Services.
        </P>

        <H2>1. Eligibility and Authority</H2>
        <P>
          The website and Services are intended primarily for businesses and
          individuals acting on behalf of businesses.
        </P>
        <P>By using the website or Services, you represent that:</P>
        <UL>
          <LI>You are at least 18 years old or the legal age of majority in your jurisdiction.</LI>
          <LI>You have the legal capacity to enter into a binding agreement.</LI>
          <LI>You own the business or have authority to act on its behalf.</LI>
          <LI>The information you provide to Vektiss is truthful, current, and complete.</LI>
          <LI>Your use of the Services will comply with all applicable laws and regulations.</LI>
        </UL>
        <P>
          When you use the Services on behalf of a company or other organization,
          “you” includes both you and that organization.
        </P>

        <H2>2. Scope of the Services</H2>
        <P>
          Vektiss designs, configures, implements, connects, and may manage
          customized business systems.
        </P>
        <P>Depending on the selected Service, these systems may:</P>
        <UL>
          <LI>Answer incoming telephone calls.</LI>
          <LI>Place permitted outbound calls.</LI>
          <LI>Respond to common customer questions.</LI>
          <LI>Collect quote or intake information.</LI>
          <LI>Qualify leads using client-approved criteria.</LI>
          <LI>Schedule or request appointments.</LI>
          <LI>Route calls and messages.</LI>
          <LI>Send text messages or emails.</LI>
          <LI>Follow up with leads or customers.</LI>
          <LI>Send applications, forms, or other resources.</LI>
          <LI>Integrate with third-party calendars, CRMs, phone systems, email accounts, websites, databases, or software.</LI>
          <LI>Summarize, categorize, or transfer information.</LI>
          <LI>Support internal business workflows.</LI>
        </UL>
        <P>
          The exact features, deliverables, pricing, implementation timeline,
          usage limits, and support obligations for a purchased Service will be
          stated in the applicable proposal, order form, statement of work,
          service agreement, or invoice.
        </P>
        <P>
          If a specific written service agreement conflicts with these general
          Terms, the specific written service agreement will control regarding
          that conflict.
        </P>

        <H2>3. Artificial Intelligence Disclosure</H2>
        <P>
          Some Vektiss Services use artificial intelligence, automated decision
          systems, machine learning models, voice technology, transcription,
          generative AI, or third-party AI providers.
        </P>
        <P>
          You understand that AI-generated responses may occasionally be
          incomplete, inaccurate, delayed, misunderstood, or inappropriate for
          a particular situation.
        </P>
        <P>AI systems should not be treated as a substitute for professional human judgment in matters involving:</P>
        <UL>
          <LI>Legal advice.</LI>
          <LI>Medical advice or emergencies.</LI>
          <LI>Financial or investment advice.</LI>
          <LI>Insurance coverage decisions.</LI>
          <LI>Employment eligibility decisions.</LI>
          <LI>Credit decisions.</LI>
          <LI>Emergency response.</LI>
          <LI>Safety-critical decisions.</LI>
          <LI>Other regulated or high-risk matters.</LI>
        </UL>
        <P>
          You are responsible for reviewing and approving the scripts,
          workflows, instructions, qualification standards, escalation
          procedures, disclosures, and information used by your system.
        </P>
        <P>
          Vektiss does not guarantee that an AI assistant will understand every
          caller, complete every action, or produce error-free responses.
        </P>

        <H2>4. Client Responsibilities</H2>
        <P>
          You are responsible for providing Vektiss with accurate and complete
          information necessary to configure and operate the Services.
        </P>
        <P>This may include:</P>
        <UL>
          <LI>Business information.</LI>
          <LI>Approved scripts and responses.</LI>
          <LI>Service descriptions.</LI>
          <LI>Pricing information.</LI>
          <LI>Hours of operation.</LI>
          <LI>Appointment availability.</LI>
          <LI>Qualification requirements.</LI>
          <LI>Frequently asked questions.</LI>
          <LI>Escalation contacts.</LI>
          <LI>Privacy or consent disclosures.</LI>
          <LI>Hiring information.</LI>
          <LI>Customer-service procedures.</LI>
          <LI>System access credentials.</LI>
          <LI>Integration permissions.</LI>
        </UL>
        <P>
          You are responsible for reviewing the completed system, testing its
          operation, reporting errors, and notifying Vektiss whenever your
          business information or procedures change.
        </P>
        <P>
          Vektiss is not responsible for errors caused by inaccurate, outdated,
          incomplete, or misleading information supplied by you.
        </P>
        <P>
          You are also responsible for maintaining appropriate human oversight
          and responding to communications, appointments, escalations, and leads
          transferred by the system.
        </P>

        <H2>5. Legal Compliance for Calls, Texts, and Emails</H2>
        <P>
          You are solely responsible for ensuring that your use of the Services
          complies with applicable communication, advertising, privacy,
          telemarketing, call-recording, employment, consumer-protection, and
          industry-specific laws.
        </P>
        <P>This includes, where applicable:</P>
        <UL>
          <LI>The Telephone Consumer Protection Act.</LI>
          <LI>The Telemarketing Sales Rule.</LI>
          <LI>The CAN-SPAM Act.</LI>
          <LI>Federal and state do-not-call requirements.</LI>
          <LI>Call-recording and monitoring laws.</LI>
          <LI>Consent and opt-out requirements.</LI>
          <LI>State privacy laws.</LI>
          <LI>Laws governing advertising and marketing claims.</LI>
          <LI>Rules governing communications within your industry.</LI>
        </UL>
        <P>
          You must obtain all permissions, consents, and authorizations legally
          required before using the Services to contact a person.
        </P>
        <P>
          You may not use the Services to send spam, unlawful solicitations,
          deceptive communications, harassing messages, or communications to
          individuals who have properly opted out.
        </P>
        <P>
          For automated text messages, you must provide legally sufficient
          opt-out instructions where required and honor requests such as “STOP.”
        </P>
        <P>
          For commercial emails, you are responsible for ensuring that messages
          use accurate sender information, contain any legally required business
          identification, and provide a functioning unsubscribe method.
        </P>
        <P>
          Vektiss may suspend or terminate any campaign, workflow, number,
          account, or Service that we reasonably believe violates the law,
          these Terms, a third-party provider’s rules, or the rights of another
          person.
        </P>

        <H2>6. Call Recording and Monitoring</H2>
        <P>
          Some Services may record, monitor, transcribe, or analyze telephone
          calls.
        </P>
        <P>
          You are responsible for determining whether notice or consent is
          required before recording, monitoring, or transcribing a call.
        </P>
        <P>
          You must provide all required notices and obtain all legally required
          consent from callers, employees, customers, applicants, and other
          participants.
        </P>
        <P>
          Vektiss does not determine whether your particular call-recording
          practices comply with the laws that apply to your business.
        </P>

        <H2>7. Hiring and Employment Communications</H2>
        <P>
          A Vektiss system may provide hiring information, collect initial
          applicant information, or send links to employment applications.
        </P>
        <P>Unless expressly agreed in writing, Vektiss does not:</P>
        <UL>
          <LI>Make hiring decisions.</LI>
          <LI>Determine employment eligibility.</LI>
          <LI>Perform background checks.</LI>
          <LI>Evaluate protected characteristics.</LI>
          <LI>Provide legal or human-resources advice.</LI>
          <LI>Guarantee that an applicant is qualified.</LI>
          <LI>Act as an employer, recruiter, or employment agency.</LI>
        </UL>
        <P>
          You remain solely responsible for your hiring process and compliance
          with employment and anti-discrimination laws.
        </P>

        <H2>8. Sensitive and Regulated Information</H2>
        <P>
          Unless expressly authorized in a written agreement, you must not use
          the Services to collect, transmit, or store:
        </P>
        <UL>
          <LI>Social Security numbers.</LI>
          <LI>Complete payment-card information.</LI>
          <LI>Banking credentials.</LI>
          <LI>Passwords or authentication codes.</LI>
          <LI>Government identification numbers.</LI>
          <LI>Highly sensitive financial records.</LI>
          <LI>Protected health information.</LI>
          <LI>Detailed medical records.</LI>
          <LI>Biometric identifiers.</LI>
          <LI>Information prohibited by applicable law or a third-party provider.</LI>
        </UL>
        <P>
          You must inform Vektiss before using the Services in a regulated
          industry or for regulated data.
        </P>
        <P>
          Vektiss does not represent that every Service is compliant with HIPAA,
          PCI DSS, GLBA, FERPA, or another specialized regulatory framework
          unless Vektiss expressly agrees to that obligation in writing and,
          when required, executes an appropriate agreement.
        </P>

        <H2>9. Third-Party Services and Integrations</H2>
        <P>
          The Services may depend on third-party platforms and providers,
          including telephone carriers, messaging providers, email services, AI
          providers, calendar tools, CRM platforms, hosting services, payment
          processors, automation platforms, and other software.
        </P>
        <P>
          Your use of third-party services may be subject to their own terms,
          privacy policies, usage limits, pricing, approval requirements, and
          acceptable-use policies.
        </P>
        <P>
          Vektiss does not own or control these third-party services and cannot
          guarantee that they will remain available, uninterrupted, compatible,
          or unchanged.
        </P>
        <P>Vektiss is not responsible for:</P>
        <UL>
          <LI>Third-party outages.</LI>
          <LI>Carrier filtering or blocking.</LI>
          <LI>Rejected telephone-number registrations.</LI>
          <LI>Messaging-registration delays.</LI>
          <LI>Email deliverability.</LI>
          <LI>Changes to third-party APIs.</LI>
          <LI>Suspended third-party accounts.</LI>
          <LI>Third-party pricing changes.</LI>
          <LI>Loss of functionality caused by an outside provider.</LI>
          <LI>Data loss or security events caused solely by a third-party provider.</LI>
        </UL>
        <P>
          Additional fees may apply when a third-party provider changes its rates
          or when your usage exceeds the amount included in your agreement.
        </P>

        <H2>10. Telephone Numbers and Messaging Registration</H2>
        <P>
          Certain phone and messaging services may require identity
          verification, business verification, campaign registration,
          toll-free verification, A2P registration, carrier approval, or
          additional documentation.
        </P>
        <P>
          Approval and processing times are controlled by third parties and are
          not guaranteed by Vektiss.
        </P>
        <P>
          You agree to provide accurate information and timely cooperation for
          all registration and verification processes.
        </P>
        <P>
          Vektiss is not responsible for delays, rejection, suspension,
          filtering, or restrictions imposed by carriers, regulators,
          registration providers, or communications platforms.
        </P>
        <P>
          Unless otherwise stated in writing, phone numbers, sender identities,
          accounts, and communication assets provided through a Vektiss-managed
          third-party account remain subject to the applicable provider’s
          ownership and portability rules.
        </P>

        <H2>11. Acceptable Use</H2>
        <P>You may not use the website or Services to:</P>
        <UL>
          <LI>Violate any law or regulation.</LI>
          <LI>Infringe intellectual-property, privacy, publicity, or other rights.</LI>
          <LI>Send spam or unauthorized marketing communications.</LI>
          <LI>Harass, threaten, deceive, defame, or discriminate against another person.</LI>
          <LI>Impersonate another person or business.</LI>
          <LI>Transmit malware, viruses, or harmful code.</LI>
          <LI>Attempt to gain unauthorized system access.</LI>
          <LI>Reverse engineer, copy, scrape, or reproduce our systems or materials.</LI>
          <LI>Interfere with the operation or security of the Services.</LI>
          <LI>Collect prohibited sensitive information.</LI>
          <LI>Facilitate fraud, unlawful debt collection, or deceptive business practices.</LI>
          <LI>Make false or misleading claims.</LI>
          <LI>Use the Services for emergency dispatch or other life-safety functions unless expressly approved in writing.</LI>
          <LI>Use the Services to make fully automated decisions that produce legal or similarly significant effects without legally sufficient oversight and authorization.</LI>
        </UL>
        <P>
          We may investigate suspected violations and suspend or terminate
          access without advance notice when reasonably necessary to protect
          Vektiss, our providers, or third parties.
        </P>

        <H2>12. Intellectual Property</H2>
        <P>
          The website, Vektiss name, logos, service names, designs, workflows,
          templates, documentation, software, prompts, systems, graphics, videos,
          text, training, and other materials created or owned by Vektiss are
          protected by intellectual-property laws.
        </P>
        <P>
          Except for rights expressly granted in writing, no ownership interest
          is transferred to you.
        </P>
        <P>
          Subject to full payment and continued compliance with these Terms,
          Vektiss grants you a limited, revocable, non-exclusive,
          non-transferable license to use the configured Services for your
          internal business operations during the term of your agreement.
        </P>
        <P>You may not:</P>
        <UL>
          <LI>Resell or sublicense the Services without written permission.</LI>
          <LI>Copy Vektiss’s proprietary workflows or documentation for a competing offering.</LI>
          <LI>Remove ownership or trademark notices.</LI>
          <LI>Reverse engineer proprietary components.</LI>
          <LI>Publish or distribute confidential implementation materials.</LI>
          <LI>Use Vektiss intellectual property outside the scope of the purchased Service.</LI>
        </UL>
        <P>
          You retain ownership of the original content, trademarks, customer
          information, and business materials that you provide to Vektiss.
        </P>
        <P>
          You grant Vektiss a limited license to use those materials only as
          reasonably necessary to provide, maintain, improve, and support the
          Services.
        </P>

        <H2>13. Confidentiality</H2>
        <P>
          Each party may receive confidential or proprietary information from
          the other.
        </P>
        <P>
          Confidential information may include business plans, pricing,
          customer information, workflows, credentials, technical information,
          software configurations, strategies, financial information, and other
          non-public information.
        </P>
        <P>Each party agrees to:</P>
        <UL>
          <LI>Use confidential information only for the purposes of the business relationship.</LI>
          <LI>Take reasonable measures to protect it.</LI>
          <LI>Limit access to people who need the information.</LI>
          <LI>Not disclose it to third parties except as authorized or legally required.</LI>
        </UL>
        <P>Confidential information does not include information that:</P>
        <UL>
          <LI>Becomes public without a breach of these Terms.</LI>
          <LI>Was already lawfully known to the receiving party.</LI>
          <LI>Is received lawfully from another source.</LI>
          <LI>Is independently developed without using the confidential information.</LI>
        </UL>

        <H2>14. Account Security</H2>
        <P>
          You are responsible for protecting all usernames, passwords, access
          codes, API keys, and account credentials connected to your Services.
        </P>
        <P>
          You must immediately notify Vektiss if you suspect unauthorized
          access, credential exposure, account compromise, or misuse.
        </P>
        <P>
          You are responsible for actions taken through your accounts unless
          directly caused by Vektiss’s proven misconduct.
        </P>

        <H2>15. Orders and Service Acceptance</H2>
        <P>
          Submitting an application, booking a consultation, receiving a
          proposal, or receiving an invoice does not obligate Vektiss to provide
          Services.
        </P>
        <P>An order is accepted only when:</P>
        <UL>
          <LI>Vektiss confirms acceptance;</LI>
          <LI>The applicable agreement or proposal is signed when required; and</LI>
          <LI>The required initial payment has cleared.</LI>
        </UL>
        <P>
          Vektiss may decline a project when it falls outside our capabilities,
          risk standards, legal requirements, provider restrictions, or business
          criteria.
        </P>

        <H2>16. Fees and Payment</H2>
        <P>
          You agree to pay all setup fees, subscription charges, usage fees,
          third-party costs, taxes, and other amounts stated in your agreement,
          invoice, proposal, or order form.
        </P>
        <P>Unless otherwise stated:</P>
        <UL>
          <LI>Payments are due in U.S. dollars.</LI>
          <LI>Setup and implementation fees are due before work begins.</LI>
          <LI>Monthly fees are billed in advance.</LI>
          <LI>Usage-based fees may be billed after usage occurs.</LI>
          <LI>Services may be suspended when payment is overdue.</LI>
          <LI>Failure to use the Services does not eliminate your payment obligations.</LI>
          <LI>You are responsible for applicable taxes, excluding taxes imposed on Vektiss’s net income.</LI>
        </UL>
        <P>
          You authorize Vektiss and its payment processor to charge your
          approved payment method according to the billing schedule stated in
          your agreement.
        </P>
        <P>
          You must promptly update expired or inaccurate payment information.
        </P>

        <H2>17. Recurring Payments and Cancellation</H2>
        <P>
          When you purchase a recurring Service, you authorize automatic
          recurring charges until the Service is properly canceled or the
          applicable agreement ends.
        </P>
        <P>
          Cancellation requirements, minimum commitments, renewal terms, and
          notice periods will be governed by your specific service agreement.
        </P>
        <P>
          Unless a different period is stated in that agreement, monthly Services
          require at least ten days’ written notice before the next billing
          date.
        </P>
        <P>
          Cancellation requests must be sent to:{" "}
          <a
            href="mailto:info@vektiss.com"
            className="text-primary underline underline-offset-4"
          >
            info@vektiss.com
          </a>
          .
        </P>
        <P>Cancellation does not relieve you of:</P>
        <UL>
          <LI>Charges already incurred.</LI>
          <LI>Amounts due under a minimum commitment.</LI>
          <LI>Usage fees.</LI>
          <LI>Third-party charges.</LI>
          <LI>Past-due balances.</LI>
          <LI>Other obligations that survive cancellation.</LI>
        </UL>

        <H2>18. Refund Policy</H2>
        <P>
          Unless a service agreement, proposal, or written guarantee expressly
          states otherwise, all payments are nonrefundable.
        </P>
        <P>
          Setup, strategy, configuration, implementation, consulting,
          customization, and digital-service fees compensate Vektiss for time and
          resources committed to your project.
        </P>
        <P>
          Once work begins, those Services are considered delivered in part and
          are not refundable.
        </P>
        <P>Vektiss does not provide refunds, credits, or prorated billing for:</P>
        <UL>
          <LI>Unused time.</LI>
          <LI>Unused call or message capacity.</LI>
          <LI>Failure to provide requested information.</LI>
          <LI>Delays caused by you.</LI>
          <LI>Third-party approval delays.</LI>
          <LI>Canceled subscriptions.</LI>
          <LI>A decision to stop using the system before the end of a billing period or commitment.</LI>
        </UL>
        <P>Nothing in this section limits a right that cannot legally be waived.</P>

        <H2>19. Implementation and Delivery</H2>
        <P>
          Any delivery or implementation dates are good-faith estimates unless
          expressly guaranteed in writing.
        </P>
        <P>Timelines may be affected by:</P>
        <UL>
          <LI>Client response times.</LI>
          <LI>Missing information.</LI>
          <LI>Required approvals.</LI>
          <LI>Revisions.</LI>
          <LI>Third-party integrations.</LI>
          <LI>Carrier registration.</LI>
          <LI>Number verification.</LI>
          <LI>Platform outages.</LI>
          <LI>Scope changes.</LI>
          <LI>Technical limitations.</LI>
        </UL>
        <P>
          You agree to provide timely feedback, approvals, credentials, content,
          and other resources reasonably requested by Vektiss.
        </P>
        <P>
          Delays caused by your failure to cooperate do not excuse payment
          obligations or require Vektiss to provide a refund.
        </P>

        <H2>20. Changes in Scope</H2>
        <P>Requests beyond the deliverables listed in the applicable proposal or agreement may require:</P>
        <UL>
          <LI>A revised timeline.</LI>
          <LI>A change order.</LI>
          <LI>Additional setup fees.</LI>
          <LI>Higher recurring charges.</LI>
          <LI>Additional usage fees.</LI>
        </UL>
        <P>
          Vektiss is not required to perform work outside the agreed scope
          unless both parties approve the change.
        </P>

        <H2>21. Service Availability and Maintenance</H2>
        <P>
          Vektiss will use commercially reasonable efforts to provide the
          Services, but we do not guarantee uninterrupted or error-free
          operation.
        </P>
        <P>Temporary interruption may occur because of:</P>
        <UL>
          <LI>Scheduled maintenance.</LI>
          <LI>Emergency maintenance.</LI>
          <LI>Internet or telecommunications outages.</LI>
          <LI>Third-party failures.</LI>
          <LI>Security incidents.</LI>
          <LI>Software updates.</LI>
          <LI>Carrier restrictions.</LI>
          <LI>Events outside our reasonable control.</LI>
        </UL>
        <P>
          Unless expressly agreed in a separate service-level agreement, no
          guaranteed uptime or response-time commitment applies.
        </P>

        <H2>22. Results Disclaimer</H2>
        <P>
          Vektiss provides technology, implementation, and management services.
          We do not guarantee a specific number of:
        </P>
        <UL>
          <LI>Calls.</LI>
          <LI>Leads.</LI>
          <LI>Appointments.</LI>
          <LI>Customers.</LI>
          <LI>Sales.</LI>
          <LI>Hires.</LI>
          <LI>Quotes.</LI>
          <LI>Revenue.</LI>
          <LI>Cost savings.</LI>
          <LI>Conversions.</LI>
          <LI>Return on investment.</LI>
        </UL>
        <P>
          Business results depend on factors outside Vektiss’s control,
          including your offer, pricing, reputation, sales process, market, call
          volume, staffing, response procedures, lead quality, advertising,
          customer demand, and implementation of transferred opportunities.
        </P>
        <P>
          Testimonials and examples represent individual experiences and do not
          guarantee that another client will receive the same result.
        </P>

        <H2>23. Testimonials and Client Materials</H2>
        <P>
          When you voluntarily provide a testimonial, review, photograph, logo,
          audio recording, video, case study, or other promotional material, you
          represent that you have the right to provide it.
        </P>
        <P>
          Unless otherwise agreed, you grant Vektiss a non-exclusive, worldwide,
          royalty-free license to use, reproduce, edit for length or clarity,
          publish, display, and distribute the submitted material for
          legitimate marketing and promotional purposes.
        </P>
        <P>
          Vektiss will not knowingly attribute a materially false statement to
          you.
        </P>
        <P>
          You may request that future use of a testimonial be discontinued by
          contacting{" "}
          <a
            href="mailto:info@vektiss.com"
            className="text-primary underline underline-offset-4"
          >
            info@vektiss.com
          </a>
          . This request will not require Vektiss to recall materials already
          produced or distributed.
        </P>

        <H2>24. Privacy</H2>
        <P>
          Our collection and use of personal information submitted through the
          website is governed by our Privacy Policy.
        </P>
        <P>
          When Vektiss processes information on your behalf through a
          configured business system, each party’s data responsibilities may also
          be governed by a service agreement or data-processing agreement.
        </P>
        <P>
          You are responsible for providing legally required privacy notices to
          your callers, customers, leads, employees, and applicants.
        </P>

        <H2>25. Disclaimers of Warranties</H2>
        <P>
          To the maximum extent permitted by law, the website and Services are
          provided on an “as is” and “as available” basis.
        </P>
        <P>
          Vektiss disclaims all express and implied warranties, including
          warranties of:
        </P>
        <UL>
          <LI>Merchantability.</LI>
          <LI>Fitness for a particular purpose.</LI>
          <LI>Non-infringement.</LI>
          <LI>Accuracy.</LI>
          <LI>Availability.</LI>
          <LI>Compatibility.</LI>
          <LI>Security.</LI>
          <LI>Uninterrupted operation.</LI>
          <LI>Business results.</LI>
        </UL>
        <P>We do not warrant that:</P>
        <UL>
          <LI>The Services will meet every requirement.</LI>
          <LI>Every call or message will be completed.</LI>
          <LI>Every caller will be correctly understood.</LI>
          <LI>Every lead will be converted.</LI>
          <LI>Every appointment will be accurate.</LI>
          <LI>All generated information will be error-free.</LI>
          <LI>Third-party services will remain available.</LI>
          <LI>All defects will be corrected immediately.</LI>
          <LI>Data transmission will always be secure.</LI>
        </UL>
        <P>
          Some jurisdictions do not allow certain warranty exclusions, so some
          exclusions may not apply to you.
        </P>

        <H2>26. Limitation of Liability</H2>
        <P>
          To the maximum extent permitted by law, Vektiss and its owners,
          officers, employees, contractors, affiliates, providers, and agents
          will not be liable for indirect, incidental, special, exemplary,
          punitive, or consequential damages.
        </P>
        <P>This includes damages relating to:</P>
        <UL>
          <LI>Lost profits.</LI>
          <LI>Lost revenue.</LI>
          <LI>Lost business opportunities.</LI>
          <LI>Missed calls.</LI>
          <LI>Lost leads.</LI>
          <LI>Lost appointments.</LI>
          <LI>Business interruption.</LI>
          <LI>Lost or corrupted data.</LI>
          <LI>Reputational harm.</LI>
          <LI>Cost of replacement services.</LI>
          <LI>Third-party claims.</LI>
        </UL>
        <P>
          To the maximum extent permitted by law, Vektiss’s total cumulative
          liability arising from or connected with the Services will not exceed
          the amount you paid directly to Vektiss for the affected Service during
          the three months immediately preceding the event giving rise to the
          claim.
        </P>
        <P>
          These limitations apply regardless of the legal theory asserted and
          even if Vektiss was advised that damages were possible.
        </P>
        <P>Nothing in these Terms excludes liability that cannot legally be excluded.</P>

        <H2>27. Indemnification</H2>
        <P>
          To the maximum extent permitted by law, you agree to defend,
          indemnify, and hold harmless Vektiss and its owners, officers,
          employees, contractors, affiliates, providers, and agents from claims,
          liabilities, losses, damages, judgments, penalties, expenses, and
          reasonable attorneys’ fees arising from:
        </P>
        <UL>
          <LI>Your misuse of the website or Services.</LI>
          <LI>Information or instructions you provide.</LI>
          <LI>Your business operations.</LI>
          <LI>Your communications with customers, leads, employees, or applicants.</LI>
          <LI>Your failure to obtain legally required consent.</LI>
          <LI>Your violation of call-recording laws.</LI>
          <LI>Your violation of telemarketing, email, messaging, privacy, or employment laws.</LI>
          <LI>Your infringement of third-party rights.</LI>
          <LI>Your breach of these Terms or another agreement with Vektiss.</LI>
          <LI>Claims made by your customers, callers, employees, applicants, or other third parties.</LI>
        </UL>
        <P>
          Vektiss may control the defense of any claim subject to
          indemnification, and you agree to reasonably cooperate.
        </P>

        <H2>28. Suspension and Termination</H2>
        <P>
          Vektiss may suspend or terminate your access to the Services if:
        </P>
        <UL>
          <LI>You fail to pay an amount when due.</LI>
          <LI>You violate these Terms.</LI>
          <LI>You violate applicable law.</LI>
          <LI>Your activity creates security, legal, operational, or reputational risk.</LI>
          <LI>A third-party provider requires suspension.</LI>
          <LI>You misuse a phone number, email service, messaging service, integration, or AI system.</LI>
          <LI>You fail to cooperate with required verification.</LI>
          <LI>Your continued use may harm Vektiss or another person.</LI>
        </UL>
        <P>
          Termination does not relieve you of outstanding payment or
          indemnification obligations.
        </P>
        <P>
          Provisions that by their nature should survive termination will remain
          effective, including intellectual property, confidentiality, payment,
          disclaimers, limitations of liability, indemnification, and
          dispute-resolution provisions.
        </P>

        <H2>29. Informal Dispute Resolution</H2>
        <P>
          Before filing arbitration or another permitted legal action, the
          complaining party must provide written notice describing the dispute
          and requested resolution.
        </P>
        <P>
          Notices to Vektiss must be sent to:{" "}
          <a
            href="mailto:info@vektiss.com"
            className="text-primary underline underline-offset-4"
          >
            info@vektiss.com
          </a>
          .
        </P>
        <P>
          The parties will attempt in good faith to resolve the dispute informally
          for at least 30 days after receipt of the notice.
        </P>

        <H2>30. Binding Arbitration and Class-Action Waiver</H2>
        <P>Please read this section carefully.</P>
        <P>
          Except for matters that may legally be brought in small-claims court or
          claims seeking temporary injunctive relief for misuse of intellectual
          property or confidential information, disputes arising from these
          Terms, the website, the Services, or the relationship between you and
          Vektiss will be resolved through final and binding individual
          arbitration.
        </P>
        <P>
          The arbitration will be administered by the American Arbitration
          Association under its applicable rules and conducted by one neutral
          arbitrator.
        </P>
        <P>
          Unless the parties agree otherwise, the arbitration will take place in
          Harris County, Texas, or remotely by telephone, video conference, or
          written submissions.
        </P>
        <P>
          Each party waives the right to have a covered dispute decided by a
          judge or jury.
        </P>
        <P>
          Disputes must be brought individually. Neither party may participate
          as a plaintiff, claimant, or class member in a class, collective,
          consolidated, or representative proceeding.
        </P>
        <P>
          The arbitrator may award relief only to the individual party seeking
          relief and only to the extent necessary to resolve that party’s
          individual claim.
        </P>
        <P>
          If the class-action waiver is found unenforceable for a particular
          claim, that claim will proceed in an appropriate court rather than
          class arbitration.
        </P>

        <H2>31. Governing Law and Venue</H2>
        <P>
          These Terms and the relationship between you and Vektiss will be
          governed by the laws of the State of Texas, without regard to
          conflict-of-law principles.
        </P>
        <P>
          For disputes not subject to arbitration, you consent to the exclusive
          jurisdiction and venue of the state and federal courts located in Harris
          County, Texas.
        </P>

        <H2>32. Electronic Communications and Signatures</H2>
        <P>
          You agree that electronic communications, notices, agreements,
          disclosures, records, and signatures may satisfy legal requirements
          that the communication or agreement be in writing.
        </P>
        <P>
          Clicking a button such as “Submit,” “Apply,” “Purchase,” “Pay,”
          “Accept,” “Agree,” or a similar button may constitute your electronic
          signature and acceptance of the applicable agreement.
        </P>
        <P>
          You agree to maintain a valid email address and monitor it for notices
          concerning the Services.
        </P>

        <H2>33. Marketing Communications</H2>
        <P>
          When you expressly consent through a website form or another lawful
          method, Vektiss may contact you regarding your inquiry, application,
          consultation, account, purchase, or related Services by email,
          telephone, or text message.
        </P>
        <P>
          Consent to marketing is not a condition of purchasing a Service unless
          clearly stated and legally permitted.
        </P>
        <P>Message and data rates may apply.</P>
        <P>You may:</P>
        <UL>
          <LI>Reply <strong>STOP</strong> to opt out of eligible text messages.</LI>
          <LI>Use the unsubscribe link in a marketing email.</LI>
          <LI>
            Email{" "}
            <a
              href="mailto:info@vektiss.com"
              className="text-primary underline underline-offset-4"
            >
              info@vektiss.com
            </a>{" "}
            to request removal from applicable marketing communications.
          </LI>
        </UL>
        <P>
          Opting out of marketing communications will not prevent Vektiss from
          sending necessary transactional or service-related messages.
        </P>

        <H2>34. Force Majeure</H2>
        <P>
          Vektiss will not be liable for delays or failures caused by
          circumstances beyond our reasonable control, including:
        </P>
        <UL>
          <LI>Natural disasters.</LI>
          <LI>Severe weather.</LI>
          <LI>Fire.</LI>
          <LI>War.</LI>
          <LI>Terrorism.</LI>
          <LI>Civil unrest.</LI>
          <LI>Labor disputes.</LI>
          <LI>Government actions.</LI>
          <LI>Internet failures.</LI>
          <LI>Power failures.</LI>
          <LI>Telecommunications outages.</LI>
          <LI>Cyberattacks.</LI>
          <LI>Epidemics or pandemics.</LI>
          <LI>Third-party platform failures.</LI>
          <LI>Carrier or provider restrictions.</LI>
        </UL>

        <H2>35. Assignment</H2>
        <P>
          You may not assign or transfer your rights or obligations under these
          Terms without Vektiss’s written consent.
        </P>
        <P>
          Vektiss may assign these Terms in connection with a merger,
          acquisition, reorganization, sale of assets, change of control, or
          transfer to an affiliate.
        </P>

        <H2>36. Changes to These Terms</H2>
        <P>
          Vektiss may update these Terms from time to time.
        </P>
        <P>
          The updated version will be posted with a revised effective date.
        </P>
        <P>
          Your continued use of the website or Services after updated Terms
          become effective constitutes acceptance of the revised Terms, except
          where additional notice or consent is legally required.
        </P>

        <H2>37. Severability</H2>
        <P>
          If any provision of these Terms is found invalid or unenforceable,
          that provision will be enforced to the maximum extent permitted or
          severed, and the remaining provisions will remain in effect.
        </P>

        <H2>38. No Waiver</H2>
        <P>
          A failure or delay by Vektiss to enforce a provision does not waive the
          right to enforce it later.
        </P>
        <P>
          A waiver is effective only when it is in writing and signed by an
          authorized representative of Vektiss.
        </P>

        <H2>39. Entire Agreement</H2>
        <P>
          These Terms, the Privacy Policy, applicable proposals, order forms,
          statements of work, service agreements, and incorporated policies
          constitute the entire agreement regarding the applicable website or
          Services.
        </P>
        <P>
          They replace prior or contemporaneous discussions and representations
          concerning the same subject.
        </P>

        <H2>40. Contact Information</H2>
        <P>
          Questions regarding these Terms may be sent to:
          <br />
          <br />
          <strong className="text-foreground">Vektiss</strong>
          <br />
          525 North Sam Houston Parkway East, Suite 415
          <br />
          Houston, Texas 77060
          <br />
          Email:{" "}
          <a
            href="mailto:info@vektiss.com"
            className="text-primary underline underline-offset-4"
          >
            info@vektiss.com
          </a>
        </P>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground sm:py-10 sm:text-base">
        © {new Date().getFullYear()} Vektiss Technologies ·{" "}
        <Link to="/" className="hover:text-foreground">
          Back to site
        </Link>
      </footer>
    </div>
  );
}
