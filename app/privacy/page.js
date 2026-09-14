// app/privacy/page.jsx
import Link from "next/link";
import LegalPage, { P, UL, LI, Note } from "@/components/LegalPage";
import { COMPANY } from "@/lib/company";

export const metadata = {
  title: "Privacy Policy - Artics Decorr",
  description:
    "Read the Artics Decorr Privacy Policy to understand how we collect, use, protect and manage your personal information.",
};

const SECTIONS = [
  {
    id: "introduction",
    heading: "Introduction",
    body: (
      <>
        <P>
          {COMPANY.legalName} respects your privacy and is committed to protecting
          your personal information. This Privacy Policy explains how we collect,
          use, store and protect information when you visit{" "}
          {COMPANY.website.replace("https://", "")}, create an account, place an
          order, contact us or otherwise use our website and services.
        </P>

        <P>
          By using our website, you acknowledge that your information may be
          processed as described in this Privacy Policy. We only collect
          information that is reasonably required to operate our website,
          process orders, provide customer support and improve our services.
        </P>
      </>
    ),
  },

  {
    id: "information-we-collect",
    heading: "Information We Collect",
    body: (
      <>
        <P>
          Depending on how you interact with Artics Decorr, we may collect the
          following types of information:
        </P>

        <UL>
          <LI>
            <strong className="font-medium text-[#132c47]">
              Account information
            </strong>{" "}
            — your name, email address, password and other information required
            to create and manage your account.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Contact information
            </strong>{" "}
            — your phone number, email address and other contact details when you
            contact us or submit an enquiry.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Order information
            </strong>{" "}
            — billing and delivery details, products ordered, order value,
            delivery preferences and order history.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Customer communications
            </strong>{" "}
            — messages, enquiries, feedback and information you provide through
            our contact forms, email, phone or other communication channels.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Website activity
            </strong>{" "}
            — pages visited, products viewed, browsing behaviour, referring
            pages and interactions with our website.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Technical information
            </strong>{" "}
            — IP address, browser type, device type, operating system and
            information collected through cookies and server logs.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Reviews and wishlist information
            </strong>{" "}
            — product reviews, ratings, wishlist items and other content you
            choose to submit on the website.
          </LI>
        </UL>

        <Note>
          We do not intentionally store your complete card number, CVV or
          banking credentials on our website. Payment information is handled
          through the payment service used for your order. We may receive
          payment confirmation, transaction status and related information
          necessary to complete your order.
        </Note>
      </>
    ),
  },

  {
    id: "how-we-use-information",
    heading: "How We Use Your Information",
    body: (
      <>
        <P>
          We use the information we collect for legitimate business and
          customer-service purposes, including:
        </P>

        <UL>
          <LI>
            <strong className="font-medium text-[#132c47]">
              Processing orders
            </strong>{" "}
            — to process purchases, payments, deliveries, cancellations,
            replacements and refunds.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Managing your account
            </strong>{" "}
            — to create your account, authenticate you and provide access to
            your order history and wishlist.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Customer support
            </strong>{" "}
            — to respond to questions, enquiries, complaints and service
            requests.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Product and service improvement
            </strong>{" "}
            — to understand how customers use our website and improve our
            products, services and shopping experience.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Website security
            </strong>{" "}
            — to detect suspicious activity, prevent fraud, protect accounts
            and maintain the security of our website.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Legal and business requirements
            </strong>{" "}
            — to maintain appropriate business, accounting, tax and transaction
            records and comply with applicable legal requirements.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Marketing
            </strong>{" "}
            — to send promotional communications where you have provided
            appropriate consent or where permitted by applicable law.
          </LI>
        </UL>
      </>
    ),
  },

  {
    id: "payment-information",
    heading: "Payment Information",
    body: (
      <>
        <P>
          Payments made through our website may be processed through third-party
          payment providers. Your payment details may therefore be processed
          directly by the applicable payment provider according to its own
          privacy and security practices.
        </P>

        <P>
          Artics Decorr does not require your complete card number, CVV or
          banking password for normal customer support purposes. We may retain
          transaction-related information such as payment status, transaction
          reference and order amount where necessary for accounting, order
          processing and customer support.
        </P>

        <Note>
          Payment processing may involve third-party service providers. Please
          review the applicable payment provider's privacy policy for details
          about how it handles payment information.
        </Note>
      </>
    ),
  },

  {
    id: "sharing",
    heading: "Who We Share Information With",
    body: (
      <>
        <P>
          We do not sell or rent your personal information. We may share
          limited information with trusted service providers when it is
          necessary to provide our products and services.
        </P>

        <UL>
          <LI>
            <strong className="font-medium text-[#132c47]">
              Payment providers
            </strong>{" "}
            — to process and verify payments and transactions.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Delivery and logistics partners
            </strong>{" "}
            — to deliver your furniture or other products to the address
            provided with your order.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Hosting and technology providers
            </strong>{" "}
            — to host, maintain and secure our website and related systems.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Email and communication providers
            </strong>{" "}
            — to send transactional emails, order updates and customer
            communications.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Professional advisers
            </strong>{" "}
            — including accountants, legal advisers and other professional
            service providers where reasonably required.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Government or regulatory authorities
            </strong>{" "}
            — where disclosure is required by applicable law or necessary to
            protect our legal rights.
          </LI>
        </UL>

        <P>
          We aim to share only the information reasonably necessary for the
          relevant service or purpose and expect our service providers to
          handle personal information appropriately.
        </P>
      </>
    ),
  },

  {
    id: "cookies",
    heading: "Cookies & Similar Technologies",
    body: (
      <>
        <P>
          Our website may use cookies and similar technologies to provide
          essential website functionality, remember preferences and understand
          how visitors use our website.
        </P>

        <UL>
          <LI>
            <strong className="font-medium text-[#132c47]">
              Essential cookies
            </strong>{" "}
            — required for features such as account sessions, shopping cart
            functionality and other essential website operations.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Preference cookies
            </strong>{" "}
            — help remember certain settings and preferences.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Analytics cookies
            </strong>{" "}
            — help us understand website traffic and improve the customer
            experience.
          </LI>
        </UL>

        <P>
          You can manage or disable cookies through your browser settings.
          Please note that disabling essential cookies may affect some website
          features.
        </P>
      </>
    ),
  },

  {
    id: "data-security",
    heading: "How We Protect Your Information",
    body: (
      <P>
        We take reasonable technical and organisational measures to protect
        personal information against unauthorised access, loss, misuse,
        alteration or disclosure. Our website uses encrypted HTTPS
        communication, and account passwords are stored using appropriate
        security measures rather than plain text.
        <br />
        <br />
        Access to customer information is limited to people and service
        providers who require it for legitimate business purposes. However, no
        internet transmission or storage system can be guaranteed to be
        completely secure.
      </P>
    ),
  },

  {
    id: "data-retention",
    heading: "How Long We Keep Your Information",
    body: (
      <>
        <P>
          We retain personal information only for as long as reasonably
          necessary for the purpose for which it was collected, including
          providing services, maintaining business records, resolving disputes
          and meeting applicable legal or accounting requirements.
        </P>

        <UL>
          <LI>
            <strong className="font-medium text-[#132c47]">
              Order and transaction records
            </strong>{" "}
            — retained as required for business, accounting, tax and legal
            purposes.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Account information
            </strong>{" "}
            — retained while your account remains active or where otherwise
            required for legitimate business purposes.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Customer communications
            </strong>{" "}
            — retained for as long as reasonably necessary to handle the
            relevant enquiry, service request or dispute.
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Marketing preferences
            </strong>{" "}
            — retained to respect your communication preferences and opt-out
            requests.
          </LI>
        </UL>

        <P>
          When personal information is no longer reasonably required, we may
          delete it, anonymise it or securely dispose of it.
        </P>
      </>
    ),
  },

  {
    id: "your-rights",
    heading: "Your Privacy Rights",
    body: (
      <>
        <P>
          Depending on applicable law, you may have rights relating to the
          personal information we hold about you, including the right to:
        </P>

        <UL>
          <LI>Ask what personal information we hold about you.</LI>
          <LI>Request correction of inaccurate or incomplete information.</LI>
          <LI>
            Request deletion of information where there is no valid reason for
            us to retain it.
          </LI>
          <LI>Withdraw consent where processing is based on your consent.</LI>
          <LI>Object to certain types of processing where applicable.</LI>
          <LI>Opt out of promotional communications.</LI>
        </UL>

        <P>
          To make a privacy-related request, contact us at{" "}
          <a
            href={`mailto:${COMPANY.email}`}
            className="text-[#770800] hover:underline"
          >
            {COMPANY.email}
          </a>
          . We may need to verify your identity before processing certain
          requests.
        </P>
      </>
    ),
  },

  {
    id: "marketing",
    heading: "Marketing Communications",
    body: (
      <P>
        We may send promotional communications about Artics Decorr products,
        collections, offers or updates where permitted by applicable law and
        where you have provided the required consent.
        <br />
        <br />
        You can unsubscribe from marketing emails using the unsubscribe option
        included in the communication or by contacting us directly. Even if you
        opt out of marketing communications, we may still send essential
        transactional messages such as order confirmations, payment updates,
        delivery notifications, account messages and service-related
        communications.
      </P>
    ),
  },

  {
    id: "third-party-links",
    heading: "Third-Party Websites",
    body: (
      <P>
        Our website may contain links to third-party websites, services or
        social media platforms. These websites operate independently and have
        their own privacy policies and terms. Artics Decorr is not responsible
        for the privacy practices or content of third-party websites.
        <br />
        <br />
        We recommend reviewing the privacy policy of any third-party website
        before providing personal information.
      </P>
    ),
  },

  {
    id: "children",
    heading: "Children's Privacy",
    body: (
      <P>
        Our website and services are intended for general customers and are not
        specifically directed at children. We do not knowingly request or
        collect personal information from children where such collection is
        prohibited by applicable law.
        <br />
        <br />
        If you believe that a child has provided personal information to us,
        please contact us so that we can review and, where appropriate, remove
        the information.
      </P>
    ),
  },

  {
    id: "changes",
    heading: "Changes to This Privacy Policy",
    body: (
      <P>
        We may update this Privacy Policy from time to time to reflect changes
        in our business, website, services, technology or applicable legal
        requirements.
        <br />
        <br />
        The updated version will be published on this page with the applicable
        revision date. We encourage you to review this page periodically for
        the latest information.
        <br />
        <br />
        Our{" "}
        <Link
          href="/terms"
          className="text-[#770800] hover:underline"
        >
          Terms &amp; Conditions
        </Link>{" "}
        should be read together with this Privacy Policy.
      </P>
    ),
  },

  {
    id: "contact",
    heading: "Contact Us",
    body: (
      <>
        <P>
          If you have any questions about this Privacy Policy, your personal
          information or how we handle customer data, please contact Artics
          Decorr using the details below.
        </P>

        <UL>
          <LI>
            <strong className="font-medium text-[#132c47]">
              Company:
            </strong>{" "}
            {COMPANY.legalName}
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Email:
            </strong>{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="text-[#770800] hover:underline"
            >
              {COMPANY.email}
            </a>
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Phone:
            </strong>{" "}
            <a
              href={`tel:${COMPANY.phoneHref}`}
              className="text-[#770800] hover:underline"
            >
              {COMPANY.phone}
            </a>
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Address:
            </strong>{" "}
            {COMPANY.address}
          </LI>
        </UL>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      breadcrumb="Privacy Policy"
      subtitle="How Artics Decorr collects, uses and protects your personal information while providing our furniture, decor and online services."
      sections={SECTIONS}
    />
  );
}