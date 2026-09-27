# Legal drafts: Terms of Service and Privacy Policy

**Status: draft for review by counsel. Not published.** The live `/terms` and `/privacy` pages are unchanged. Nothing here is legal advice, and every bracketed item needs a decision before these replace the live text.

## Why these drafts exist

The live pages describe an earlier product. They say Bonggy is "read-only" and "doesn't send, sequence, or act", which no longer holds: bots can add CRM tasks, post to channels and, after a person approves, send customer-facing messages. The live terms also promise "Cancel anytime" and "No implementation fees", which are not in the approved pricing wording. The drafts below align with the current product and the approved copy:

- Pricing: active bots plus usage; flow runs count toward usage; no public numbers yet.
- Approval by action: anything customer-facing needs a person; internal output can run without approval if the customer's team chooses.
- Data handling (until engineering confirms specifics): built for read-scoped permissions, encryption in transit and at rest, and no training on customer data. SOC 2 Type II: on the path, not attained.

Open questions for counsel and engineering are marked **[TODO]**.

---

## Terms of Service (draft)

_Last updated: [TODO: date]_

### 1. Who we are
Bonggy ("we", "us") provides an agent workspace where sales, RevOps and marketing teams build bots that run flows the customer designs. These terms apply to the customer organisation ("you") and the people you invite ("users"). **[TODO: legal entity name, registered address, governing law and venue.]**

### 2. What you get
You can build bots, design their flows (trigger, context, steps, approval, output, goal), set hard limits, group bots across teams, review work in an approvals inbox, and see analytics. Bots act only through the tools and permissions you connect.

### 3. Approvals and your responsibility
- Anything a bot drafts that a customer or prospect would see (emails, posts, sequencer pushes, published content) waits for a user's approval before it is sent. This can't be switched off.
- Internal output (for example a brief in chat, a Slack summary, a CRM task) can run without approval if your team configures it that way.
- You are responsible for what your users approve and for the flows, limits and permissions you configure. Bots can make mistakes; review their work before approving it.

### 4. Acceptable use
Connect only tools and accounts you're authorised to use, and only data you have the right to process. Don't use Bonggy to send bulk or unsolicited messages, to evade the approval step, to monitor individuals outside a legitimate business context, or to rank employees against each other. **[TODO: anti-spam and consent obligations by region (e.g. CAN-SPAM, GDPR/PECR, CASL).]**

### 5. Your data
Your content, contacts, CRM data and outputs remain yours. You grant us a limited licence to process them only to provide and secure the service. We don't use your data to train shared models. You can export your data while your account is active. **[TODO: export formats; retention and deletion period after termination.]**

### 6. Fees
Pricing is based on active bots plus usage; flow runs count toward usage. Plans, billing periods and any minimums are set in your order form. **[TODO: payment terms, renewals, cancellation and refund policy, taxes.]**

### 7. Early access
Early-access features may change or be withdrawn and may have lower availability. **[TODO: pilot terms, any SLA (or none), feedback licence.]**

### 8. Third-party services
Bots connect to third-party tools under your accounts with those providers. Their terms govern your use of them, and we aren't responsible for their availability or conduct.

### 9. Confidentiality and security
Each party protects the other's confidential information with reasonable care. We maintain security measures appropriate to the service. **[TODO: reference a security addendum / DPA once engineering confirms controls. Don't name specific protocols or certifications until confirmed; SOC 2 Type II is on the path, not attained.]**

### 10. Warranties and liability
The service is provided "as is" to the extent permitted by law. We don't guarantee pipeline, revenue, deliverability or any business outcome. **[TODO: liability cap, exclusions, indemnities.]**

### 11. Term and termination
**[TODO: term, termination for convenience or breach, effect of termination, survival.]**

### 12. Changes
We'll give notice of material changes to these terms. **[TODO: notice period and method.]**

### 13. Contact
founders@bonggy.com

---

## Privacy Policy (draft)

_Last updated: [TODO: date]_

### 1. Scope
This policy covers personal data we process when you visit bonggy.com, request early access, apply for a role, or use the Bonggy product. **[TODO: controller entity and contact details; EU/UK representative if required.]**

### 2. What we collect
- **Website and forms:** name, work email, company, role, and anything you put in the early-access or careers forms.
- **Account data:** users' names, emails and settings.
- **Customer data:** data from the tools you connect (for example CRM records, calendar events, call notes, channel messages) and what bots produce from it. We process customer data on your behalf as a processor. **[TODO: confirm roles with counsel.]**
- **Usage data:** product events and logs used to run, secure and improve the service.

### 3. How we use it
To provide the service (running your flows, showing approvals, analytics and run receipts), to secure it, to support you, and to contact you about early access. We don't sell personal data. We don't use customer data to train shared models.

### 4. How bots act on data
Bots act only through the permissions you connect. Customer-facing messages are sent only after a user approves them. Internal actions run as your team configures them.

### 5. Sharing
With subprocessors that host and operate the service, and with the tools you connect when a bot acts on your instruction. **[TODO: publish the subprocessor list, including any model providers, and their locations.]**

### 6. Security
Bonggy is built for read-scoped permissions, encryption in transit and at rest, and no training on your data. **[TODO: engineering to confirm specifics before any protocol or certification is named. SOC 2 Type II: on the path, not attained.]**

### 7. Retention
**[TODO: retention periods for form submissions, account data, customer data and logs; deletion after termination.]**

### 8. International transfers
**[TODO: transfer mechanisms (e.g. SCCs) and hosting regions.]**

### 9. Your rights
You can ask to access, correct, export or delete your personal data, and object to or restrict certain processing. For customer data, we'll help the customer respond. **[TODO: region-specific rights (GDPR, UK GDPR, CCPA/CPRA, India DPDP Act) and response timelines.]**

### 10. Cookies and analytics
Essential cookies run the site. Analytics, if used, are aggregate and privacy-respecting. **[TODO: list the actual cookies and analytics tools, and add a consent banner if required.]**

### 11. Changes and contact
We'll post changes here and update the date. Questions: founders@bonggy.com.
